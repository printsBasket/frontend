import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Save, AlertCircle, CheckCircle2, Loader2, Package, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions';
import { listMyOrders } from '../../redux/actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import HelpSupport from './HelpSupport';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'orders'
    const [showConfirmation, setShowConfirmation] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, loading: updateLoading } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        } else if (userInfo.isAdmin) {
            navigate('/admin/dashboard');
        } else {
            if (!user || !user.firstName || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    useEffect(() => {
        if (success) {
            setShowConfirmation(true);
            const timer = setTimeout(() => {
                setShowConfirmation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, firstName, lastName, email, password }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <p className="text-gray-600 mb-4">
                        <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link> / Account Settings
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 mb-4">
                        Account Settings
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 mx-auto mb-6"></div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                        Manage your account preferences, update your profile, and track your order history
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'settings'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md border border-gray-200 hover:shadow-lg'
                        }`}
                    >
                        Profile Details
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'orders'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md border border-gray-200 hover:shadow-lg'
                        }`}
                    >
                        Order History
                    </button>
                    <button
                        onClick={() => setActiveTab('help')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'help'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md border border-gray-200 hover:shadow-lg'
                        }`}
                    >
                        Help & Support
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* User Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-blue-600 rounded-full flex items-center justify-center mb-4 text-white shadow-lg">
                                    <span className="text-3xl font-bold uppercase">{user?.firstName?.charAt(0) || user?.name?.charAt(0)}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                                <p className="text-gray-600 text-sm mt-1">{user?.email}</p>
                                <div className="mt-4 inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-50 text-gray-700 text-xs font-bold rounded-full border border-blue-200">
                                    {user?.isAdmin ? 'Administrator' : 'Customer'}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                                <div className="flex items-center justify-between text-gray-600 text-sm">
                                    <span className="flex items-center gap-2"><Package size={16} className="text-blue-600" /> Orders</span>
                                    <span className="font-bold text-gray-900">{orders?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 text-sm">
                                    <span className="flex items-center gap-2"><CreditCard size={16} className="text-blue-600" /> Saved Cards</span>
                                    <span className="font-bold text-gray-900">0</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Help Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg shadow-md p-6 border border-blue-200">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl">💬</span>
                                <h3 className="font-bold text-blue-900">Need Help?</h3>
                            </div>
                            <p className="text-gray-700 text-sm mb-4">Our support team is available to help you with any questions.</p>
                            <Link to="/contact-us" className="block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'settings' ? (
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-50 border-b border-gray-200 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                        <p className="text-gray-600 text-sm mt-1">Update your profile details and security settings</p>
                                    </div>
                                    <User className="text-blue-300" size={32} />
                                </div>

                                <form onSubmit={submitHandler} className="p-6 space-y-6">
                                    {message && (
                                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                                            <AlertCircle size={18} />
                                            {message}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                                            <AlertCircle size={18} />
                                            {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
                                            <CheckCircle2 size={18} />
                                            Profile Updated Successfully
                                        </div>
                                    )}

                                    {/* Personal Details Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Personal Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">First Name</label>
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Section */}
                                    <div className="pt-6 border-t border-gray-100 space-y-4">
                                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Security Settings</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-gray-100">
                                        <button
                                            type="submit"
                                            disabled={loading || updateLoading}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:shadow-lg disabled:opacity-50 active:scale-95"
                                        >
                                            {updateLoading || loading ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : activeTab === 'orders' ? (
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                                        <p className="text-gray-600 text-sm mt-1">View and track all your previous purchases</p>
                                    </div>
                                    <Package className="text-green-300" size={32} />
                                </div>

                                <div className="p-6">
                                    {loadingOrders ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                                            <p className="text-gray-600">Fetching your orders...</p>
                                        </div>
                                    ) : errorOrders ? (
                                        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3">
                                            <AlertCircle size={20} />
                                            {errorOrders}
                                        </div>
                                    ) : orders && orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Package className="text-gray-400" size={32} />
                                            </div>
                                            <h3 className="text-gray-900 font-bold text-lg">No orders found</h3>
                                            <p className="text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
                                            <Link
                                                to="/"
                                                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                                            >
                                                Start Shopping
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="pb-4 pt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                                                        <th className="pb-4 pt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                                        <th className="pb-4 pt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                                                        <th className="pb-4 pt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                                        <th className="pb-4 pt-2 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {orders && orders.map((order) => (
                                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="py-4 font-mono text-sm text-gray-700">#{order._id.substring(18)}</td>
                                                            <td className="py-4">
                                                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                                    <Calendar size={14} />
                                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                                                            <td className="py-4">
                                                                {order.isPaid ? (
                                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Paid</span>
                                                                ) : (
                                                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase">Failed</span>
                                                                )}
                                                            </td>
                                                            <td className="py-4 text-right">
                                                                <Link
                                                                    to={`/order/${order._id}`}
                                                                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                                                >
                                                                    Details
                                                                    <ChevronRight size={16} />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : activeTab === 'help' ? (
                            <HelpSupport />
                        ) : null}
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 animate-fadeIn">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={32} className="text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Success!</h2>
                            <p className="text-center text-gray-600 mb-6">
                                Your profile has been updated successfully. Your changes have been saved.
                            </p>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:shadow-lg"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
