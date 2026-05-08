import React from 'react';
import { Save } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 w-full max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your store configuration and preferences.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800">General Settings</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Store Name</label>
                            <input type="text" defaultValue="Prints Basket" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Support Email</label>
                            <input type="email" defaultValue="support@printsbasket.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                        <input type="text" defaultValue="95 Broadacre Dr, Kitchener, ON N2R 0S5, Canada" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-right">
                    <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800">Security</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <h4 className="font-semibold text-slate-800">Two-Factor Authentication</h4>
                            <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                        </div>
                        <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">Enable</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
