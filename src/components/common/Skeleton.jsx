const Skeleton = ({ className = '' }) => (
    <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-4 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-24" />
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <Skeleton className="h-96 w-full rounded-2xl" />
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-16 rounded-lg" />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-20 w-full" />
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-12 w-40 rounded-xl" />
                        <Skeleton className="h-12 w-40 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const OrderDetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-64" />
            </div>
            <div className="flex justify-between">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <Skeleton className="h-16 w-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-5 w-20" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const DashboardSkeleton = () => (
    <>
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-20" />
            </div>
        ))}
    </>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
    <>
        {[...Array(rows)].map((_, i) => (
            <tr key={i}>
                {[...Array(cols)].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                        <Skeleton className="h-4 w-full" />
                    </td>
                ))}
            </tr>
        ))}
    </>
);

export default Skeleton;
