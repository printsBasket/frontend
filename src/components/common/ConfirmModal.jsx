import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300 border border-slate-100">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-10 text-center space-y-6">
                    <div className="inline-flex p-5 bg-red-50 text-red-500 rounded-3xl mb-2">
                        <AlertTriangle size={40} />
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title || 'Confirm Deletion'}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {message || 'Are you sure you want to proceed? This action cannot be undone.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all uppercase tracking-widest text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-red-100 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            {loading ? 'Deleting...' : 'Confirm Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
