import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalytics } from '../../../redux/actions/analyticsActions';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    Calendar,
    CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardSkeleton } from '../../common/Skeleton';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const analyticsState = useSelector((state) => state.analytics);
    const { loading, analytics, error } = analyticsState;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAnalytics());
        }
    }, [dispatch, userInfo]);

    const statsDisplay = analytics ? [
        {
            label: 'Total Revenue',
            value: `$${analytics.revenue.total.toFixed(2)}`,
            change: `${analytics.revenue.growth >= 0 ? '+' : ''}${analytics.revenue.growth}%`,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100'
        },
        {
            label: 'Total Orders',
            value: analytics.orders.total.toString(),
            change: `${analytics.orders.growth >= 0 ? '+' : ''}${analytics.orders.growth}%`,
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: 'Active Stock',
            value: analytics.activeStock ? analytics.activeStock.toString() : '0',
            change: '', // No growth metric for stock yet
            icon: ShoppingBag, // Or another icon like Package
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
        {
            label: 'Total Customers',
            value: analytics.customers.total.toString(),
            change: `${analytics.customers.growth >= 0 ? '+' : ''}${analytics.customers.growth}%`,
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
    ] : [];

    const statusStyles = {
        'Processing': 'bg-blue-50 text-blue-700 border-blue-100',
        'Shipped': 'bg-purple-50 text-purple-700 border-purple-100',
        'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Cancelled': 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                    <Calendar size={16} />
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <DashboardSkeleton />
                ) : error ? (
                    <div className="col-span-full text-center py-10 text-red-500">{error}</div>
                ) : statsDisplay.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : stat.change.startsWith('-') ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
                                {stat.change} <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-lg text-slate-800">Recent Orders</h2>
                        <button onClick={() => navigate('/admin/orders')} className="text-sm text-blue-600 font-semibold hover:text-blue-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="5" className="py-10 text-center text-slate-400">Loading orders...</td></tr>
                                ) : analytics && analytics.recentOrders && analytics.recentOrders.length > 0 ? (
                                    analytics.recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')} onKeyDown={(e) => e.key === 'Enter' && navigate('/admin/orders')} tabIndex={0} role="link">
                                            <td className="px-6 py-4 font-bold text-slate-700">ORD-{order._id.substring(order._id.length - 4).toUpperCase()}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{order.user?.name || 'Guest'}</div>
                                                <div className="text-xs text-slate-400">{order.user?.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyles[order.status] || 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-slate-500">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="py-10 text-center text-slate-400">No orders found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/orders')}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100"><CreditCard size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">Total Orders</span>
                                </div>
                                <span className="font-bold text-slate-900">{analytics?.orders.total || 0}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/orders')}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100"><ShoppingBag size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">Processing</span>
                                </div>
                                <span className="font-bold text-slate-900">
                                    {analytics?.ordersByStatus?.find(s => s._id === 'Processing')?.count || 0}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/customers')}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100"><Users size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">Total Customers</span>
                                </div>
                                <span className="font-bold text-slate-900">{analytics?.customers.total || 0}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
