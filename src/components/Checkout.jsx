import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import api from '../lib/api';
import { Loader2, ShieldCheck, Truck, CreditCard, ChevronRight, Lock } from 'lucide-react';
import SEO from './common/SEO';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || 'US');
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [step, setStep] = useState(1);
    const [shippingRates, setShippingRates] = useState([]);
    const [distance, setDistance] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ratesFetched, setRatesFetched] = useState(false);
    const [clover, setClover] = useState(null);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    useEffect(() => {
        const mountCloverElements = () => {
            setTimeout(() => {
                const numberEl = document.querySelector('#card-number');
                const dateEl = document.querySelector('#card-date');
                const cvvEl = document.querySelector('#card-cvv');
                const zipEl = document.querySelector('#card-postal-code');

                // Check if containers exist and are empty
                if (numberEl && !numberEl.hasChildNodes()) {
                    const cloverInstance = new window.Clover(import.meta.env.VITE_CLOVER_PUBLIC_KEY);
                    const elements = cloverInstance.elements();

                    const styles = {
                        body: {
                            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: '14px',
                            color: '#334155', // slate-700
                            fontWeight: '500',
                            margin: '0',
                            padding: '0',
                            width: '100%'
                        },
                        input: {
                            padding: '0',
                            margin: '0',
                            width: '100%'
                        },
                        'input::placeholder': {
                            color: '#94a3b8' // slate-400
                        }
                    };

                    const cardNumber = elements.create('CARD_NUMBER', { styles });
                    const cardDate = elements.create('CARD_DATE', { styles });
                    const cardCvv = elements.create('CARD_CVV', { styles });
                    const cardPostalCode = elements.create('CARD_POSTAL_CODE', { styles });

                    cardNumber.mount('#card-number');
                    cardDate.mount('#card-date');
                    cardCvv.mount('#card-cvv');
                    cardPostalCode.mount('#card-postal-code');

                    setClover(cloverInstance);
                }
            }, 100);
        };

        if (!userInfo || cartItems.length === 0) {
            navigate('/cart');
        } else if (step === 2) {
            if (window.Clover) {
                mountCloverElements();
                return;
            }

            let script = document.getElementById('clover-sdk');
            if (!script) {
                script = document.createElement('script');
                script.id = 'clover-sdk';
                script.src = 'https://checkout.clover.com/sdk.js';
                script.defer = true;
                document.body.appendChild(script);
            }

            script.addEventListener('load', mountCloverElements, { once: true });
        }
    }, [userInfo, cartItems, navigate, step]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = 0;
    const shippingPrice = selectedRate ? Number(selectedRate.rate) : 0;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const submitShippingHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, state: province, phone }));

        if (shippingRates.length === 0) {
            try {
                setLoading(true);
                const { data } = await api.post(
                    `/shipping/rates`,
                    { address, city, postalCode, country, state: province, phone, cartItems }
                );
                
                const rates = data.rates || (Array.isArray(data) ? data : []);
                setDistance(data.distance || null);

                                // Deduplicate by carrier + service, keep cheapest of each
                                const uniqueMap = {};
                                rates.forEach(rate => {
                                    const key = `${rate.carrier}_${rate.service}`;
                                    if (!uniqueMap[key] || Number(rate.rate) < Number(uniqueMap[key].rate)) {
                                        uniqueMap[key] = rate;
                                    }
                                });
                                // Sort by price and show up to 4 best options
                                const bestRates = Object.values(uniqueMap)
                                    .sort((a, b) => Number(a.rate) - Number(b.rate))
                                    .slice(0, 4);
                                setShippingRates(bestRates);
                                setRatesFetched(true);
                                if (bestRates.length > 0) setSelectedRate(bestRates[0]);
            } catch (error) {
                alert(error.response?.data?.message || 'Error fetching shipping rates');
            } finally {
                setLoading(false);
            }
        } else {
            if (!selectedRate) {
                alert('Please select a shipping method');
                return;
            }
            setStep(2);
        }
    };

    // ✅ CLOVER PAYMENT
    const initPayment = async () => {
        try {
            setLoading(true);

            if (!clover) {
                alert('Clover not initialized');
                setLoading(false);
                return;
            }

            const result = await clover.createToken();
            if (result.errors) {
                 alert('Payment Error: ' + Object.values(result.errors).join(', '));
                 setLoading(false);
                 return;
            }
            if (!result.token) {
                 alert('Failed to create payment token. Please check your card details.');
                 setLoading(false);
                 return;
            }

            // 1. Create order
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { 
                    address, 
                    city, 
                    postalCode, 
                    country, 
                    phone, 
                    state: province,
                    shippingMethod: selectedRate ? `${selectedRate.carrier} ${selectedRate.service}` : ''
                },
                paymentMethod: 'Clover',
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            const { data: createdOrder } = await api.post(
                `/orders`,
                orderData
            );

            // 2. Clover payment (backend)
            await api.post(
                `/orders/clover/pay`,
                {
                    amount: totalPrice,
                    orderId: createdOrder._id,
                    source: result.token
                }
            );

            navigate('/profile');

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Clover payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-12">
            <SEO title="Checkout" description="Complete your order securely. Enter shipping details and payment information." canonical="/checkout" />
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4">

                {/* Progress */}
                <div className="flex items-center justify-center mb-12 space-x-4">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                                step >= s ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                            }`}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-3">
                        {step === 1 ? (
                            <form onSubmit={submitShippingHandler} className="bg-gradient-to-br from-white to-blue-50/30 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-lg shadow-blue-100/30 border-2 border-slate-100 backdrop-blur-sm">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-3 uppercase tracking-tighter text-center sm:text-left">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <Truck size={20} />
                                    </div>
                                    Shipping Details
                                </h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Street Address</label>
                                        <input 
                                            value={address} 
                                            onChange={(e) => { setAddress(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                            required 
                                            placeholder="123 Main St" 
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">City</label>
                                            <input 
                                                value={city} 
                                                onChange={(e) => { setCity(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                placeholder="New York" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">State / Province</label>
                                            <input 
                                                value={province} 
                                                onChange={(e) => { setProvince(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required
                                                placeholder="NY" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Postal Code</label>
                                            <input 
                                                value={postalCode} 
                                                onChange={(e) => { setPostalCode(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                placeholder="10001" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Country</label>
                                            <select 
                                                value={country} 
                                                onChange={(e) => { setCountry(e.target.value); setRatesFetched(false); setShippingRates([]); setSelectedRate(null); }} 
                                                required 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700"
                                            >
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Phone Number</label>
                                            <input 
                                                value={phone} 
                                                onChange={(e) => setPhone(e.target.value)} 
                                                required 
                                                placeholder="+1 (555) 000-0000" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {shippingRates.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        <div className="flex justify-between items-end">
                                            <h3 className="text-lg font-bold text-slate-900">Select Shipping Method</h3>
                                            {distance && (
                                                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                                    Distance: {distance} miles
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            {shippingRates.map((rate) => (
                                                <button 
                                                    type="button"
                                                    key={rate.id}
                                                    onClick={() => setSelectedRate(rate)}
                                                    className={`w-full p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all flex-wrap sm:flex-nowrap ${
                                                        selectedRate?.id === rate.id 
                                                            ? 'border-slate-900 bg-slate-50' 
                                                            : 'border-slate-100 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-bold text-slate-900 break-words whitespace-normal text-sm sm:text-base">{rate.service}</div>
                                                        <div className="text-xs text-slate-500 break-words whitespace-normal">{rate.carrier} • {rate.delivery_days ? `${rate.delivery_days} days` : 'Standard'}</div>
                                                    </div>
                                                    <div className="font-bold text-slate-900 text-right mt-2 sm:mt-0 min-w-[80px]">
                                                        ${Number(rate.rate).toFixed(2)} {rate.currency}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {shippingRates.length === 0 && !loading && !ratesFetched && (
                                     <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-200">
                                        Please enter your address above and click Calculate Shipping to see available rates.
                                     </div>
                                )}

                                {shippingRates.length === 0 && !loading && ratesFetched && (
                                     <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-xl text-sm border border-red-200">
                                        No shipping rates available for this address. Please verify your address details and try again.
                                     </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full mt-10 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-blue-200/50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-wait hover:from-blue-700 hover:to-blue-700">
                                     {loading ? <Loader2 className="animate-spin" /> : (
                                        shippingRates.length > 0 ? (
                                            <>Proceed to Payment <ChevronRight size={16} /></>
                                        ) : (
                                            <>Calculate Shipping <Truck size={16} /></>
                                        )
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-gradient-to-br from-white to-blue-50/30 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-lg shadow-blue-100/30 border-2 border-slate-100 backdrop-blur-sm space-y-6 sm:space-y-8">
                                {/* Payment Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <CreditCard size={20} />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">Payment</h2>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-600 whitespace-nowrap">
                                        Edit Shipping
                                    </button>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 mb-6">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Order Summary</h4>
                                    <div className="divide-y divide-slate-200">
                                        {cartItems.map((item, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row sm:justify-between py-3 text-sm font-medium text-slate-700 gap-1">
                                                <span className="line-clamp-1 font-semibold">{item.title}</span>
                                                <span className="shrink-0">{item.qty} × ${item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Card Payment Section */}
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pay with Card</label>
                                        <div className="flex gap-2">
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">VISA</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">MC</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">AMEX</div>
                                        </div>
                                    </div>

                                    {/* Card Number */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Card Number</label>
                                        <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                            <div id="card-number" className="w-full h-[22px]"></div>
                                        </div>
                                    </div>

                                    {/* Expiry, CVV, Zip - Responsive Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Expiry</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-date" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">CVV</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-cvv" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Zip Code</label>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-postal-code" className="w-full h-[22px]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium px-1 mt-2">
                                        <Lock size={10} />
                                        <span>Instant Payment Processing. No OTP required for supported cards.</span>
                                    </div>

                                    {/* Terms & Conditions Checkbox */}
                                    <div className="mt-6 p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={agreeToTerms}
                                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                                className="w-5 h-5 mt-0.5 accent-blue-600 cursor-pointer rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-xs leading-relaxed text-slate-700 font-medium group-hover:text-slate-900">
                                                By placing your order, you confirm that you have read and agree to our <a href="/terms-and-conditions" target="_blank" className="text-blue-600 hover:text-blue-700 underline font-semibold">Terms & Conditions</a> and understand how your personal information is collected and used as described in our <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:text-blue-700 underline font-semibold">Privacy Policy</a>.
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={initPayment}
                                    disabled={loading || !agreeToTerms}
                                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-blue-200/50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-700"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : <>Pay Now <ShieldCheck size={18} /></>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50/30 border-2 border-slate-100 p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl h-fit shadow-lg shadow-blue-100/30 backdrop-blur-sm">
                        <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8 uppercase tracking-tighter">Summary</h3>
                        
                        <div className="space-y-4 font-medium">
                            <div className="flex justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-slate-600">Subtotal:</span>
                                <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">${subtotal.toFixed(2)}</span>
                            </div>

                            {distance && (
                                <div className="flex justify-between py-3 px-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-100">
                                    <span className="text-blue-600 font-semibold">Distance:</span>
                                    <span className="text-blue-600 font-bold">{distance} miles</span>
                                </div>
                            )}

                            <div className="flex justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-slate-600">Tax:</span>
                                <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">${taxPrice.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-slate-600">Shipping:</span>
                                <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">${shippingPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="my-6 h-[2px] bg-gradient-to-r from-blue-200 via-transparent to-blue-200" />
                        
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-600 text-lg">Total:</span>
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">${totalPrice.toFixed(2)}</span>
                        </div>

                        <p className="text-xs text-slate-500 mt-8 font-medium leading-relaxed px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                            🔒 Payments are securely processed via Clover (PCI-DSS compliant).
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
