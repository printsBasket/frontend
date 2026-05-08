import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { TableSkeleton } from '../../common/Skeleton';
import { useSelector } from 'react-redux';
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    ShieldOff,
    Mail,
    Phone,
    ShoppingBag,
    Trash2,
    X,
    AlertTriangle
} from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [confirmModal, setConfirmModal] = useState({ show: false, type: '', userId: null, userName: '' });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Initial Load & Search
    useEffect(() => {
        if (userInfo) {
            fetchCustomers(debouncedSearchTerm, 1, false);
        }
    }, [userInfo, debouncedSearchTerm]);

    const fetchCustomers = async (keyword = '', pageNumber = 1, append = false) => {
        if (!userInfo) return;

        try {
            setLoading(true);
            setError(null);
            
            // Get Users with pagination
            const { data: userData } = await api.get(`/auth/users?search=${keyword}&page=${pageNumber}&limit=20`);

            // Handle potential differing response structure if something failed, but expected { users, page, pages, total }
            const users = userData.users || [];
            const newPage = userData.page || 1;
            const newPages = userData.pages || 1;

            // Fetch ALL orders to calculate customer stats accurately (with high limit)
            // Or fetch limited orders and accept inaccuracies. Using high limit for now.
            const { data: orderData } = await api.get(`/orders?limit=5000`);
            const orders = orderData.orders || orderData; // Handle paginated or non-paginated return

            // Calculate stats for each customer
            const customersWithStats = users.filter(user => !user.isAdmin).map(user => {
                const userOrders = Array.isArray(orders) ? orders.filter(order => order.user && (order.user._id === user._id || order.user === user._id)) : [];
                const totalSpent = userOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
                const totalItems = userOrders.reduce((acc, order) =>
                    acc + (order.orderItems ? order.orderItems.reduce((sum, item) => sum + (item.qty || 0), 0) : 0), 0
                );

                return {
                    ...user,
                    totalOrders: userOrders.length,
                    totalSpent: totalSpent,
                    totalItems: totalItems,
                    status: user.isBlocked ? 'Blocked' : 'Active', // Use actual status if available
                    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                    })
                };
            });

            if (append) {
                setCustomers(prev => [...prev, ...customersWithStats]);
            } else {
                setCustomers(customersWithStats);
            }
            
            setPage(newPage);
            setPages(newPages);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const loadMoreHandler = () => {
        if (page < pages) {
            fetchCustomers(debouncedSearchTerm, page + 1, true);
        }
    };

    const handleDeleteUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'delete', userId, userName: user?.name || 'this user' });
    };

    const confirmDelete = async () => {
        if (!userInfo) return;

        try {
            await api.delete(`/auth/users/${confirmModal.userId}`);
            setConfirmModal({ show: false, type: '', userId: null, userName: '' });
            fetchCustomers();
        } catch (err) {
            console.error('Delete user error:', err);
            alert(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const confirmBlock = async () => {
        if (!userInfo) {
            console.error('No userInfo available');
            return;
        }

        try {
            const response = await api.put(`/auth/users/${confirmModal.userId}/block`, {});
            setConfirmModal({ show: false, type: '', userId: null, userName: '' });
            fetchCustomers();
        } catch (err) {
            console.error('Block user error:', err);
            alert(err.response?.data?.message || err.message || 'Failed to block user');
        }
    };


    const handleBlockUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'block', userId, userName: user?.name || 'this user' });
    };

    const handleUnblockUser = async (userId) => {
        if (!userInfo) return;
        try {
            await api.put(`/auth/users/${userId}/unblock`, {});
            fetchCustomers(searchTerm, 1, false); // Refresh list
        } catch (err) {
            console.error('Unblock user error:', err);
            alert(err.response?.data?.message || 'Failed to unblock user');
        }
    };

    const confirmUnblock = async () => {
        if (!userInfo) return;

        try {
            await api.put(`/auth/users/${confirmModal.userId}/unblock`, {});
            setConfirmModal({ show: false, type: '', userId: null, userName: '' });
            fetchCustomers();
        } catch (err) {
            console.error('Unblock user error:', err);
            alert(err.response?.data?.message || 'Failed to unblock user');
        }
    };

    const handleConfirm = async () => {
        if (confirmModal.type === 'delete') await confirmDelete();
        else if (confirmModal.type === 'block') await confirmBlock();
        else if (confirmModal.type === 'unblock') await confirmUnblock();
    };

    const filteredCustomers = customers; // Server-side filtered now

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
                    <p className="text-slate-500">Manage user accounts and permissions.</p>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Users size={18} />
                        <span className="font-semibold text-sm">All Customers</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {filteredCustomers.length}
                        </span>
                    </div>
                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[1000px]">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Customer Info</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Spent</th>
                                <th className="px-6 py-4">Items Bought</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <TableSkeleton rows={5} cols={7} />
                            ) : error ? (
                                <tr><td colSpan="7" className="py-10 text-center text-red-500 font-bold uppercase tracking-widest text-xs">{error}</td></tr>
                            ) : filteredCustomers.map((customer) => (
                                <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {(customer.name || 'U').charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{customer.name || 'Unknown User'}</div>
                                                <div className="text-xs text-slate-500">ID: U-{customer._id ? customer._id.substring(customer._id.length - 4).toUpperCase() : 'XXXX'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Mail size={12} /> {customer.email || 'No email'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        {customer.totalOrders || 0} Orders
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        ${(customer.totalSpent || 0).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                {customer.totalItems || 0}
                                            </div>
                                            <span className="text-slate-500 text-xs">Items</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.isBlocked ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                                <ShieldOff size={12} className="mr-1" /> Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                <Shield size={12} className="mr-1" /> Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            {customer.isBlocked ? (
                                                <button
                                                    onClick={() => handleUnblockUser(customer._id)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex items-center gap-2"
                                                >
                                                    <Shield size={14} /> Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlockUser(customer._id)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex items-center gap-2"
                                                >
                                                    <ShieldOff size={14} /> Block
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteUser(customer._id)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 flex items-center gap-2"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}

                {/* Load More Button */}
                {!loading && page < pages && (
                    <div className="flex justify-center p-6 border-t border-slate-50">
                        <button 
                            onClick={loadMoreHandler}
                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            See More Customers
                        </button>
                    </div>
                )}
            {confirmModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className={`p-6 ${confirmModal.type === 'delete' ? 'bg-red-50' : confirmModal.type === 'block' ? 'bg-blue-50' : 'bg-green-50'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${confirmModal.type === 'delete' ? 'bg-red-100 text-red-600' : confirmModal.type === 'block' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {confirmModal.type === 'delete' ? 'Delete User' : confirmModal.type === 'block' ? 'Block User' : 'Unblock User'}
                                    </h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        {confirmModal.type === 'delete'
                                            ? 'This action cannot be undone'
                                            : confirmModal.type === 'block'
                                                ? 'User will not be able to login'
                                                : 'User will be able to login again'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-6">
                                Are you sure you want to {confirmModal.type} <span className="font-bold">{confirmModal.userName}</span>?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmModal({ show: false, type: '', userId: null, userName: '' })}
                                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className={`flex-1 px-4 py-2.5 text-white rounded-lg font-semibold transition-colors ${confirmModal.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : confirmModal.type === 'block' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    {confirmModal.type === 'delete' ? 'Delete' : confirmModal.type === 'block' ? 'Block' : 'Unblock'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomers;
