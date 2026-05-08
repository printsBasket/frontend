import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Construction size={40} />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Under Construction</h1>
                <p className="text-slate-500 mb-8">
                    This page is currently being built. Please check back later!
                </p>

                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors w-full"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default UnderConstruction;
