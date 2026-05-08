import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { TableSkeleton } from '../../common/Skeleton';
import { useSelector } from 'react-redux';
import {
    Search,
    ShoppingBag,
    MoreHorizontal,
    MapPin,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    X,
    User,
    CreditCard,
    DollarSign,
    Package
} from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchOrders = async (keyword = '', pageNumber = 1, append = false) => {
        try {
            setLoading(true);
            const { data } = await api.get(`/orders?search=${keyword}&page=${pageNumber}&limit=20`);
            
            // Handle both legacy (array) and new (paginated object) responses
            const newOrders = data.orders || data; 
            const newPage = data.page || 1;
            const newPages = data.pages || 1;

            if (append) {
                setOrders(prev => [...prev, ...newOrders]);
            } else {
                setOrders(newOrders);
            }
            
            setPage(newPage);
            setPages(newPages);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (userInfo) {
            // Initial load or search change -> Page 1, replace list
            fetchOrders(debouncedSearchTerm, 1, false);
        }
    }, [userInfo, debouncedSearchTerm]);

    const loadMoreHandler = () => {
        if (page < pages) {
            const nextPage = page + 1;
            fetchOrders(debouncedSearchTerm, nextPage, true);
        }
    };

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    // Status update state
    const [updateForm, setUpdateForm] = useState({
        status: '',
        currentLocation: '',
        estTime: ''
    });

    const statusColors = {
        'Processing': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-indigo-100 text-indigo-800',
        'Out for Delivery': 'bg-blue-100 text-blue-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    const handleOpenUpdate = (order) => {
        setSelectedOrder(order);
        setUpdateForm({
            status: order.status || 'Processing',
            currentLocation: order.tracking?.currentLocation || 'Warehouse',
            estTime: order.tracking?.estTime || '3-5 Days'
        });
        setIsUpdateModalOpen(true);
    };

    const handleOpenPayment = (order) => {
        setSelectedOrder(order);
        setIsPaymentModalOpen(true);
    };

    const handleOpenItems = (order) => {
        setSelectedOrder(order);
        setIsItemsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/orders/${selectedOrder._id}/status`, updateForm);
            fetchOrders();
            setIsUpdateModalOpen(false);
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const filteredOrders = orders; // Server-side filtered now

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
                <p className="text-slate-500">Track and manage customer orders and delivery status.</p>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <ShoppingBag size={18} />
                        <span className="font-semibold text-sm">All Orders</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {filteredOrders.length}
                        </span>
                    </div>
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Order ID, Customer..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[900px]">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status & Tracking</th>
                                <th className="px-6 py-4 text-center">Items</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && (!filteredOrders || filteredOrders.length === 0) ? (
                                <TableSkeleton rows={5} cols={6} />
                            ) : error ? (
                                <tr><td colSpan="6" className="py-10 text-center text-red-500 font-bold uppercase tracking-widest text-xs">{error}</td></tr>
                            ) : (
                                <>
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className={`hover:bg-slate-50/50 transition-colors ${!order.isPaid ? 'bg-red-50/30 border-l-4 border-l-red-500' : ''}`}>
                                            <td className="px-6 py-4 font-bold text-slate-700">
                                                <div className="flex flex-col">
                                                    <span className="text-blue-600">ORD-{order._id.toUpperCase()}</span>
                                                    <div className="text-xs font-normal text-slate-400">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                    {!order.isPaid && (
                                                        <div className="text-xs font-bold text-red-600 uppercase tracking-wider mt-1">Payment Failed</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[10px]">
                                                        {order.user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-800">{order.user?.name || 'Anonymous User'}</div>
                                                        <div className="text-xs text-slate-500">ID: U-{order.user?._id?.substring(order.user?._id?.length - 4).toUpperCase() || '1001'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-800">
                                                ${(order.totalPrice || 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[order.status] || 'bg-slate-100'}`}>
                                                        {order.status || 'Processing'}
                                                    </span>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Truck size={12} />
                                                        <span className="font-medium truncate max-w-[120px]">{order.tracking?.currentLocation || 'Warehouse'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleOpenItems(order)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                                >
                                                    <Package size={16} />
                                                </button>
                                                <div className="text-[10px] text-slate-400 mt-1">{order.orderItems.reduce((acc, item) => acc + item.qty, 0)} Items</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col gap-2 items-end">
                                                    <button
                                                        onClick={() => handleOpenUpdate(order)}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors border border-blue-200 w-28 text-center"
                                                    >
                                                        Update Status
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenPayment(order)}
                                                        className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-colors border border-green-200 w-28 flex items-center justify-center gap-1"
                                                    >
                                                        <CreditCard size={12} />
                                                        Paid Info
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {loading && (
                                        <tr>
                                            <td colSpan="6" className="p-6 text-center">
                                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-widest">
                                                    <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
                                                    Loading more orders...
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Load More Button */}
                {!loading && page < pages && (
                    <div className="flex justify-center p-6 border-t border-slate-50">
                        <button 
                            onClick={loadMoreHandler}
                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            See More Orders
                        </button>
                    </div>
                )}
            </div>

            {/* Update Status Modal */}
            {isUpdateModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800">Update Tracking</h3>
                                <p className="text-xs text-slate-500">Order #ORD-{selectedOrder._id.substring(selectedOrder._id.length - 4).toUpperCase()}</p>
                            </div>
                            <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Order Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-slate-700"
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Location</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                    value={updateForm.currentLocation}
                                    onChange={(e) => setUpdateForm({ ...updateForm, currentLocation: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estimated Time</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                    value={updateForm.estTime}
                                    onChange={(e) => setUpdateForm({ ...updateForm, estTime: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg">Save Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Items Modal */}
            {isItemsModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800">Order Items</h3>
                                <p className="text-xs text-slate-500">Order #ORD-{selectedOrder._id.substring(selectedOrder._id.length - 4).toUpperCase()}</p>
                            </div>
                            <button onClick={() => setIsItemsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {selectedOrder.orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 bg-white border rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} className="w-full h-full object-contain" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-slate-500">Qty: {item.qty}</span>
                                                <span className="font-bold text-slate-900">${(item.price || 0).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="font-semibold text-slate-600">Total Items: {selectedOrder.orderItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                                <span className="text-xl font-bold text-slate-900">Total: ${(selectedOrder.totalPrice || 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className={`px-6 py-6 text-white text-center ${selectedOrder.isPaid ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}`}>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                                {selectedOrder.isPaid ? <CheckCircle size={24} className="text-white" /> : <Clock size={24} className="text-white" />}
                            </div>
                            <h3 className="font-bold text-lg">{selectedOrder.isPaid ? 'Payment Successful' : 'Payment Pending'}</h3>
                            <p className="text-white/80 text-sm">Order #ORD-{selectedOrder._id.substring(selectedOrder._id.length - 4).toUpperCase()}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="text-center mb-6">
                                <span className="text-slate-500 text-sm">Amount {selectedOrder.isPaid ? 'Paid' : 'Due'}</span>
                                <h2 className="text-3xl font-bold text-slate-900">${(selectedOrder.totalPrice || 0).toFixed(2)}</h2>
                            </div>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Payment Method</span>
                                    <span className="font-medium text-slate-800">{selectedOrder.paymentMethod}</span>
                                </div>
                                {selectedOrder.isPaid && (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Transaction ID</span>
                                            <span className="font-medium text-slate-800 font-mono text-xs">{selectedOrder.paymentResult?.id || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Date</span>
                                            <span className="font-medium text-slate-800">{new Date(selectedOrder.paidAt).toLocaleString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">Close Receipt</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
