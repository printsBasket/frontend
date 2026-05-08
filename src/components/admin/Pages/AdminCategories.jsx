import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search, Layers, Trash2, Edit, X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../../redux/actions/categoryActions';
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from '../../../redux/constants/categoryConstants';
import ConfirmModal from '../../common/ConfirmModal';

const AdminCategories = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [name, setName] = useState('');

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(listCategories());

        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET });
            setIsFormOpen(false);
            setName('');
        }

        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            setIsFormOpen(false);
            setEditingId(null);
            setName('');
        }

        if (successDelete) {
            dispatch(listCategories());
        }
    }, [dispatch, successCreate, successUpdate, successDelete]);

    const handleAddNew = () => {
        setEditingId(null);
        setName('');
        setIsFormOpen(true);
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteCategory(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            dispatch(updateCategory(editingId, { name }));
        } else {
            dispatch(createCategory({ name }));
        }
    };

    const filteredCategories = categories?.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <ConfirmModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Delete Category?"
                message="Are you sure you want to remove this category? All products linked to this category may appear as 'Uncategorized'."
                loading={loadingDelete}
            />
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                    <p className="text-slate-500">Quickly manage your product categories.</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-200"
                    >
                        <Plus size={20} />
                        Add Category
                    </button>
                )}
            </div>

            {(errorDelete || errorCreate || errorUpdate) && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100 animate-shake">
                    <AlertCircle size={20} />
                    <span className="font-bold">{errorDelete || errorCreate || errorUpdate}</span>
                </div>
            )}
            
            {successDelete && (
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl flex items-center gap-3 border border-emerald-100">
                    <CheckCircle2 size={20} />
                    <span className="font-bold">Category removed successfully</span>
                </div>
            )}

            {/* Simple Form */}
            {isFormOpen && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                        <h3 className="font-black text-white flex items-center gap-2 uppercase tracking-widest text-sm">
                            <Layers size={18} className="text-blue-400" />
                            {editingId ? 'Update Category' : 'New Category'}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-lg font-bold text-slate-800 transition-all"
                                    placeholder="Enter category name..."
                                    required
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={loadingCreate || loadingUpdate}
                                    className="px-10 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {loadingCreate || loadingUpdate ? 'SAVING...' : 'SAVE'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Simple List */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 text-white rounded-lg">
                            <Layers size={18} />
                        </div>
                        <span className="font-black text-slate-800 uppercase tracking-widest text-sm">Active Categories</span>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-black">
                            {categories?.length || 0}
                        </span>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Categories...</p>
                        </div>
                    ) : (
                        filteredCategories?.map((cat) => (
                            <div key={cat._id} className="group px-8 py-6 flex items-center justify-between hover:bg-blue-50/30 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <Layers size={24} />
                                    </div>
                                    <div className="font-black text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {cat.name}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleEdit(cat)} 
                                        className="p-3 bg-white hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(cat._id)} 
                                        className="p-3 bg-white hover:bg-red-600 text-slate-400 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {!loading && filteredCategories?.length === 0 && (
                        <div className="p-20 text-center space-y-4">
                            <Layers size={64} className="mx-auto text-slate-100" />
                            <p className="font-black text-slate-300 uppercase tracking-widest text-sm">No Categories Yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
