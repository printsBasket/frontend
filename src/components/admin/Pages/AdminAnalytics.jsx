import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { fetchAnalytics } from '../../../redux/actions/analyticsActions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminAnalytics = () => {
    const dispatch = useDispatch();
    const { analytics, loading, error } = useSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Format percentage
    const formatPercentage = (value) => {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    // Prepare chart data
    const prepareRevenueChartData = () => {
        if (!analytics?.revenueByMonth) return null;

        const months = analytics.revenueByMonth.map(item => {
            const date = new Date(item._id.year, item._id.month - 1);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        });

        return {
            labels: months,
            datasets: [
                {
                    label: 'Revenue',
                    data: analytics.revenueByMonth.map(item => item.revenue),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Orders',
                    data: analytics.revenueByMonth.map(item => item.orders),
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'orders',
                },
            ],
        };
    };

    const prepareOrdersStatusData = () => {
        if (!analytics?.ordersByStatus) return null;

        const statusColors = {
            'Delivered': '#10b981',
            'Processing': '#f59e0b',
            'Shipped': '#3b82f6',
            'Cancelled': '#ef4444',
            'Pending': '#6b7280'
        };

        return {
            labels: analytics.ordersByStatus.map(item => item._id),
            datasets: [
                {
                    data: analytics.ordersByStatus.map(item => item.count),
                    backgroundColor: analytics.ordersByStatus.map(item =>
                        statusColors[item._id] || '#6b7280'
                    ),
                    borderWidth: 2,
                    borderColor: '#ffffff',
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return `Revenue: ${formatCurrency(context.parsed.y)}`;
                        } else {
                            return `Orders: ${context.parsed.y}`;
                        }
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            },
            orders: {
                beginAtZero: true,
                position: 'right',
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                },
                grid: {
                    drawOnChartArea: false,
                },
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-500">Overview of your store's performance.</p>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-bold animate-shake">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                                    <div className="h-8 bg-slate-200 rounded w-20"></div>
                                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                                </div>
                                <div className="h-12 w-12 bg-slate-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats Cards */}
            {!loading && analytics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: 'Total Revenue',
                            value: formatCurrency(analytics.revenue?.total || 0),
                            change: formatPercentage(analytics.revenue?.growth || 0),
                            icon: DollarSign,
                            color: 'text-green-600',
                            bg: 'bg-green-100'
                        },
                        {
                            label: 'Total Orders',
                            value: analytics.orders?.total || 0,
                            change: formatPercentage(analytics.orders?.growth || 0),
                            icon: BarChart3,
                            color: 'text-blue-600',
                            bg: 'bg-blue-100'
                        },
                        {
                            label: 'Active Customers',
                            value: analytics.customers?.total || 0,
                            change: formatPercentage(analytics.customers?.growth || 0),
                            icon: Users,
                            color: 'text-purple-600',
                            bg: 'bg-purple-100'
                        },
                        {
                            label: 'Avg. Order Value',
                            value: analytics.orders?.total > 0
                                ? formatCurrency((analytics.revenue?.total || 0) / analytics.orders.total)
                                : formatCurrency(0),
                            change: '+0.0%',
                            icon: TrendingUp,
                            color: 'text-blue-600',
                            bg: 'bg-blue-100'
                        }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                                    <span className={stat.change.startsWith('+') && stat.change !== '+0.0%' ? 'text-green-600' : 'text-slate-400'}>
                                        {stat.change}
                                    </span>
                                    <span className="text-slate-400">vs last month</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Charts */}
            {!loading && analytics && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue & Orders Chart */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Revenue & Orders Trend</h3>
                                <p className="text-slate-500 text-sm">Last 6 months performance</p>
                            </div>
                        </div>
                        <div className="h-80">
                            {prepareRevenueChartData() ? (
                                <Line data={prepareRevenueChartData()} options={chartOptions} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Orders by Status */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <BarChart3 size={20} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Orders by Status</h3>
                                <p className="text-slate-500 text-sm">Current order distribution</p>
                            </div>
                        </div>
                        <div className="h-80">
                            {prepareOrdersStatusData() ? (
                                <Doughnut data={prepareOrdersStatusData()} options={doughnutOptions} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Orders Table */}
            {!loading && analytics?.recentOrders && analytics.recentOrders.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Recent Orders</h3>
                        <p className="text-slate-500 text-sm">Latest customer orders</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {analytics.recentOrders.slice(0, 5).map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-bold text-slate-700">
                                            ORD-{order._id.toUpperCase().slice(-8)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">
                                            {order.user?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-green-600">
                                            {formatCurrency(order.totalPrice)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
