import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Something went wrong</h2>
                        <p className="text-slate-500 font-medium max-w-md">An unexpected error occurred. Please try refreshing the page.</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-lg hover:shadow-blue-200/50 transition-all"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
