import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Plus, Search, Trash2, Edit, X, Save,
    Image as ImageIcon, Tag, Hash, DollarSign,
    AlignLeft, Microscope, Layers, AlertCircle,
    CheckCircle2
} from 'lucide-react';
import {
    listProducts,
    deleteProduct,
    createProduct,
    updateProduct
} from '../../../redux/actions/productActions';
import { listCategories } from '../../../redux/actions/categoryActions';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../../../redux/constants/productConstants';
import ConfirmModal from '../../common/ConfirmModal';

const AdminProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages, total } = productList; // Assuming 'total' is available in state
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]); // Array of URLs or File objects
    const [selectedFiles, setSelectedFiles] = useState([]); // Array of File objects

    // Bulk Upload State
    const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
    const [bulkFile, setBulkFile] = useState(null);
    const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
    const [bulkUploadMessage, setBulkUploadMessage] = useState('');

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const initialFormState = {
        brand: '',
        title: '',
        category: '',
        price: '',
        oldPrice: '',
        countInStock: '',
        description: '',
        shortSpecification: '', // Now acts as Keywords
        overview: '',
        technicalSpecification: '',
        images: [], // Array of existing image URLs
        reviews: [], // Array of { name, avatar, rating, comment }
        technology: [],
        usageCategory: [],
        allInOneType: [],
        wireless: '',
        mainFunction: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [specType, setSpecType] = useState('text'); // 'text' | 'table'
    const [specRows, setSpecRows] = useState([{ key: '', value: '' }]);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Initial load and Search triggers
    useEffect(() => {
        // Always reset to page 1 when search changes or strictly initial load
        dispatch(listProducts(debouncedSearchTerm, '', 1));
        dispatch(listCategories());
    }, [dispatch, debouncedSearchTerm]);

    // Refresh on actions
    useEffect(() => {
        if (successCreate || successUpdate || successDelete) {
            dispatch(listProducts(debouncedSearchTerm, '', 1));
            if (successCreate) {
                 dispatch({ type: PRODUCT_CREATE_RESET });
                 closeForm();
            }
            if (successUpdate) {
                 dispatch({ type: PRODUCT_UPDATE_RESET });
                 closeForm();
            }
        }
    }, [dispatch, successCreate, successUpdate, successDelete, debouncedSearchTerm]);

    const loadMoreHandler = () => {
        if (page < pages) {
            dispatch(listProducts(debouncedSearchTerm, '', page + 1));
        }
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData(initialFormState);
        setPreviewImages([]);
        setSelectedFiles([]);
        setSpecRows([{ key: '', value: '' }]);
        setSpecType('text');
    };

    const handleInputChange = (e) => {
        const { name, value, multiple, options } = e.target;
        if (multiple) {
            const values = Array.from(options).filter(o => o.selected).map(o => o.value);
            setFormData(prev => ({ ...prev, [name]: values }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleQuillChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);

        // Create preview URLs for new files
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        // Remove from selected files if it's a newly uploaded file
        if (index >= formData.images.length) {
            const fileIndex = index - formData.images.length;
            setSelectedFiles(prev => prev.filter((_, i) => i !== fileIndex));
        } else {
            // Remove from existing images
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        }

        // Remove from previews
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleReviewChange = (index, field, value) => {
        const newReviews = [...formData.reviews];
        newReviews[index] = { ...newReviews[index], [field]: value };
        setFormData(prev => ({ ...prev, reviews: newReviews }));
    };

    const addReview = () => {
        setFormData(prev => ({
            ...prev,
            reviews: [...prev.reviews, { name: '', avatar: '', rating: 5, comment: '' }]
        }));
    };

    const removeReview = (index) => {
        setFormData(prev => ({
            ...prev,
            reviews: prev.reviews.filter((_, i) => i !== index)
        }));
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const techSpec = product.technicalSpecification || '';

        setFormData({
            brand: product.brand || '',
            title: product.title || '',
            category: product.category?._id || product.category || '',
            price: product.price || '',
            oldPrice: product.oldPrice || '',
            countInStock: product.countInStock || '',
            description: product.description || '',
            shortSpecification: product.shortSpecification || '',
            overview: product.overview || '',
            technicalSpecification: techSpec,
            images: product.images || [],
            reviews: product.reviews || [],
            technology: Array.isArray(product.technology) ? product.technology : [],
            usageCategory: Array.isArray(product.usageCategory) ? product.usageCategory : [],
            allInOneType: Array.isArray(product.allInOneType) ? product.allInOneType : [],
            mainFunction: Array.isArray(product.mainFunction) ? product.mainFunction : [],
            wireless: typeof product.wireless === 'string' ? product.wireless : ''
        });

        // Parse Technical Specifications if it matches table structure
        if (techSpec.includes('<table') && techSpec.includes('<tr')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(techSpec, 'text/html');
                const rows = Array.from(doc.querySelectorAll('tr'));
                
                const parsedRows = rows.map((row, index) => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 2) {
                        return {
                            id: Date.now() + index,
                            key: cells[0].textContent,
                            value: cells[1].textContent
                        };
                    }
                    return null;
                }).filter(row => row !== null);

                if (parsedRows.length > 0) {
                    setSpecRows(parsedRows);
                    setSpecType('table');
                } else {
                    // Fallback to text if table parsing yields no data
                    setSpecType('text');
                    setSpecRows([{ id: Date.now(), key: '', value: '' }]);
                }
            } catch (e) {
                console.error("Error parsing technical specification table:", e);
                setSpecType('text');
                setSpecRows([{ id: Date.now(), key: '', value: '' }]);
            }
        } else {
            setSpecType('text');
            setSpecRows([{ id: Date.now(), key: '', value: '' }]);
        }

        // Set preview images for existing images
        setPreviewImages(product.images || []);
        setSelectedFiles([]); // Clear any previously selected files
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteProduct(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    // Technical Specification Table Builders
    const addSpecRow = () => {
        setSpecRows([...specRows, { id: Date.now(), key: '', value: '' }]);
    };

    const removeSpecRow = (id) => {
        setSpecRows(specRows.filter(row => row.id !== id));
    };

    const updateSpecRow = (id, field, value) => {
        setSpecRows(specRows.map(row => 
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        // Handle Tech Specs Table Mode
        let finalTechSpecs = formData.technicalSpecification;
        if (specType === 'table') {
            const tableRows = specRows.filter(r => r.key && r.value).map(r => 
                `<tr class="border-b border-slate-100">
                    <td class="py-3 pr-4 font-bold text-slate-900 uppercase text-xs w-1/3">${r.key}</td>
                    <td class="py-3 text-slate-600 text-sm">${r.value}</td>
                </tr>`
            ).join('');
            
            finalTechSpecs = `<table class="w-full text-left border-collapse"><tbody>${tableRows}</tbody></table>`;
        }

        // Add form fields
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                data.append('existingImages', JSON.stringify(formData.images));
            } else if (key === 'reviews') {
                data.append('reviews', JSON.stringify(formData.reviews));
            } else if (key === 'technicalSpecification') {
                data.append('technicalSpecification', finalTechSpecs);
            } else {
                data.append(key, formData[key]);
            }
        });

        // Add selected files
        selectedFiles.forEach(file => {
            data.append('images', file);
        });

        if (editingId) {
            dispatch(updateProduct(editingId, data));
        } else {
            dispatch(createProduct(data));
        }
    };

    const handleBulkUpload = async (e) => {
        e.preventDefault();
        if (!bulkFile) {
            setBulkUploadMessage('Please select a file');
            return;
        }

        setBulkUploadLoading(true);
        setBulkUploadMessage('');

        const formData = new FormData();
        formData.append('excelFile', bulkFile);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
                },
            };

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/bulk-upload`, formData, config);
            setBulkUploadMessage(data.message);
            if (data.errors) {
                setBulkUploadMessage(`${data.message}\nErrors: ${data.errors.join(', ')}`);
            }
            dispatch(listProducts());
            setBulkFile(null);
        } catch (error) {
            setBulkUploadMessage(error.response?.data?.message || 'Upload failed');
        } finally {
            setBulkUploadLoading(false);
        }
    };

    const filteredProducts = products; // Used directly from Redux now (server filtered)

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Delete Product?"
                message="Are you sure you want to remove this product from inventory? This will permanently delete its data and images."
                loading={loadingDelete}
            />
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Product Inventory</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage and refine your store offerings.</p>
                </div>
                {!isFormOpen && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsBulkUploadOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-green-100"
                        >
                            <Plus size={20} />
                            BULK UPLOAD
                        </button>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-100"
                        >
                            <Plus size={20} />
                            CREATE PRODUCT
                        </button>
                    </div>
                )}
            </div>

            {/* Error States */}
            {(error || errorDelete || errorCreate || errorUpdate) && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-bold animate-shake">
                    <AlertCircle size={20} />
                    {error || errorDelete || errorCreate || errorUpdate}
                </div>
            )}

            {/* Comprehensive Single Form */}
            {isFormOpen && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
                    <div className="bg-slate-900 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                            <Tag className="text-blue-400" size={18} />
                            {editingId ? 'Updating Product' : 'Register New Product'}
                        </h3>
                        <button onClick={closeForm} className="text-slate-400 hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-12">
                        {/* Section 1: Basics */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><AlignLeft size={18} /></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Basic Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Laserjet Pro M404n"
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        placeholder="e.g. HP, Canon"
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories?.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Structured Product Attributes */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technology</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Inkjet', 'Laser', 'Laser (B/W)'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={Array.isArray(formData.technology) && formData.technology.includes(opt)}
                                                    onChange={e => {
                                                        setFormData(prev => {
                                                            const arr = Array.isArray(prev.technology) && prev.technology.includes(opt)
                                                                ? prev.technology.filter(v => v !== opt)
                                                                : [...(Array.isArray(prev.technology) ? prev.technology : []), opt];
                                                            return { ...prev, technology: arr };
                                                        });
                                                    }}
                                                />
                                                <span className="text-xs font-bold text-blue-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usage Category</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Home', 'Office', 'Mobile', 'Photo'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={Array.isArray(formData.usageCategory) && formData.usageCategory.includes(opt)}
                                                    onChange={e => {
                                                        setFormData(prev => {
                                                            const arr = Array.isArray(prev.usageCategory) && prev.usageCategory.includes(opt)
                                                                ? prev.usageCategory.filter(v => v !== opt)
                                                                : [...(Array.isArray(prev.usageCategory) ? prev.usageCategory : []), opt];
                                                            return { ...prev, usageCategory: arr };
                                                        });
                                                    }}
                                                />
                                                <span className="text-xs font-bold text-blue-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All-in-One Type</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Multifunction', 'Single Function'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={Array.isArray(formData.allInOneType) && formData.allInOneType.includes(opt)}
                                                    onChange={e => {
                                                        setFormData(prev => {
                                                            const arr = Array.isArray(prev.allInOneType) && prev.allInOneType.includes(opt)
                                                                ? prev.allInOneType.filter(v => v !== opt)
                                                                : [...(Array.isArray(prev.allInOneType) ? prev.allInOneType : []), opt];
                                                            return { ...prev, allInOneType: arr };
                                                        });
                                                    }}
                                                />
                                                <span className="text-xs font-bold text-purple-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wireless</label>
                                    <select
                                        name="wireless"
                                        value={formData.wireless}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                    >
                                        <option value="">Select Wireless</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Function</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Print', 'Scan', 'Copy', 'Fax', 'Print Only'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={Array.isArray(formData.mainFunction) && formData.mainFunction.includes(opt)}
                                                    onChange={e => {
                                                        setFormData(prev => {
                                                            const arr = Array.isArray(prev.mainFunction) && prev.mainFunction.includes(opt)
                                                                ? prev.mainFunction.filter(v => v !== opt)
                                                                : [...(Array.isArray(prev.mainFunction) ? prev.mainFunction : []), opt];
                                                            return { ...prev, mainFunction: arr };
                                                        });
                                                    }}
                                                />
                                                <span className="text-xs font-bold text-green-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Pricing & Stock */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign size={18} /></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Pricing & Availability</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-emerald-50/30 border border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-black text-emerald-700 text-lg"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sale Price ($)</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</label>
                                    <input
                                        type="number"
                                        name="countInStock"
                                        value={formData.countInStock}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Visuals */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><ImageIcon size={18} /></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Product Media</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                    />
                                    <p className="text-xs text-slate-500">Select multiple images (JPG, PNG, WebP). Max 5MB each.</p>
                                </div>

                                {/* Image Previews */}
                                {previewImages.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image Previews</label>
                                        <div className="flex flex-wrap gap-4">
                                            {previewImages.map((preview, index) => (
                                                <div key={index} className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 group shadow-lg">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="p-2 bg-red-600 text-white rounded-xl shadow-xl hover:scale-110 transition-transform"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                    {index < formData.images.length && (
                                                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg font-bold">
                                                            Existing
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Rich Content */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><AlignLeft size={18} /></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Detailed Descriptions</h4>
                            </div>



                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highlights (Rich Text)</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.shortDetails}
                                            onChange={(val) => handleQuillChange('shortDetails', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Narrative Overview</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.overview}
                                            onChange={(val) => handleQuillChange('overview', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Technical Data */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-slate-100 text-slate-800 rounded-lg"><Microscope size={18} /></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Technical Specifications</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Keywords</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.shortSpecification}
                                            onChange={(val) => handleQuillChange('shortSpecification', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Specification</label>
                                        <div className="flex bg-slate-100 rounded-lg p-1">
                                            <button
                                                type="button"
                                                onClick={() => setSpecType('text')}
                                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${specType === 'text' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                Text Editor
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSpecType('table')}
                                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${specType === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                Table Builder
                                            </button>
                                        </div>
                                    </div>

                                    {specType === 'text' ? (
                                        <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.technicalSpecification}
                                                onChange={(val) => handleQuillChange('technicalSpecification', val)}
                                                modules={quillModules}
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                                            {specRows.map((row) => (
                                                <div key={row.id} className="flex gap-4 items-start">
                                                    <input
                                                        type="text"
                                                        placeholder="Feature (e.g., Resolution)"
                                                        value={row.key}
                                                        onChange={(e) => updateSpecRow(row.id, 'key', e.target.value)}
                                                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Value (e.g., 1920x1080)"
                                                        value={row.value}
                                                        onChange={(e) => updateSpecRow(row.id, 'value', e.target.value)}
                                                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSpecRow(row.id)}
                                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        disabled={specRows.length === 1}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addSpecRow}
                                                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl text-xs font-black transition-colors"
                                            >
                                                <Plus size={16} />
                                                ADD SPECIFICATION ROW
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 6: Reviews & Testimonials */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Tag size={18} /></div>
                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Reviews & Testimonials</h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={addReview}
                                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-pink-100"
                                >
                                    <Plus size={14} />
                                    ADD REVIEW
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.reviews.map((review, index) => (
                                    <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group animate-in slide-in-from-right-4 duration-300">
                                        <button
                                            type="button"
                                            onClick={() => removeReview(index)}
                                            className="absolute -top-2 -right-2 p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all border border-slate-100"
                                        >
                                            <X size={16} />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reviewer Name</label>
                                                <input
                                                    type="text"
                                                    value={review.name}
                                                    onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avatar URL (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={review.avatar}
                                                    onChange={(e) => handleReviewChange(index, 'avatar', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating (1-5)</label>
                                                <select
                                                    value={review.rating}
                                                    onChange={(e) => handleReviewChange(index, 'rating', Number(e.target.value))}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                >
                                                    {[5, 4, 3, 2, 1].map(num => (
                                                        <option key={num} value={num}>{num} Stars</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1 md:col-span-2 lg:col-span-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                                                <textarea
                                                    value={review.comment}
                                                    onChange={(e) => handleReviewChange(index, 'comment', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20 resize-none"
                                                    rows="1"
                                                    placeholder="Excellent product!"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {formData.reviews.length === 0 && (
                                    <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center">
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No reviews added for this product.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-10 border-t border-slate-200 flex justify-end sticky bottom-0 bg-white/95 backdrop-blur-sm px-4 py-6 rounded-b-3xl z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
                            <button
                                type="submit"
                                disabled={loadingCreate || loadingUpdate}
                                className="w-full px-16 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 disabled:opacity-50 flex items-center justify-center gap-4 text-xl tracking-widest"
                            >
                                <Save size={28} />
                                {loadingCreate || loadingUpdate ? 'SAVING DATA...' : (editingId ? 'UPDATE PRODUCT' : 'REGISTER PRODUCT')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {isBulkUploadOpen && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
                    <div className="bg-slate-900 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                            <Tag className="text-green-400" size={18} />
                            Bulk Upload Products
                        </h3>
                        <button
                            onClick={() => setIsBulkUploadOpen(false)}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <form onSubmit={handleBulkUpload} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-600 uppercase tracking-widest">Excel File (.xlsx or .xls)</label>
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={(e) => setBulkFile(e.target.files[0])}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold text-slate-800"
                                required
                            />
                            <p className="text-xs text-slate-500">Upload an Excel file with columns: brand, title, category, price, oldPrice, countInStock, description, shortDetails, shortSpecification, overview, technicalSpecification, color, width, height, depth, screenSize</p>
                        </div>

                        {bulkUploadMessage && (
                            <div className="p-4 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl font-bold whitespace-pre-line">
                                {bulkUploadMessage}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsBulkUploadOpen(false)}
                                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={bulkUploadLoading}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50"
                            >
                                {bulkUploadLoading ? 'Uploading...' : 'Upload Products'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
                            <Layers size={20} />
                        </div>
                        <span className="font-black text-slate-800 uppercase tracking-widest">Total Products</span>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-black">
                            {total || products?.length || 0}
                        </span>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search Inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-80 font-bold transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-slate-50/30 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Pricing</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && (!filteredProducts || filteredProducts.length === 0) ? (
                                <tr><td colSpan="5" className="p-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest">SYNCHRONIZING INVENTORY...</td></tr>
                            ) : (
                                <>
                                    {filteredProducts?.map((p) => (
                                        <tr key={p._id} className="hover:bg-blue-50/30 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform rotate-1 group-hover:rotate-0">
                                                        <img
                                                            src={p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : `${import.meta.env.VITE_API_URL.replace('/api', '')}${p.images[0]}`) : '/printer.png'}
                                                            alt=""
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => e.target.src = '/printer.png'}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">{p.title}</div>
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{p.brand || 'No Brand'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                                    {p.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-900 text-xl tracking-tighter">${p.price.toFixed(2)}</div>
                                                {p.oldPrice > 0 && <div className="text-xs text-slate-300 line-through font-bold">${p.oldPrice.toFixed(2)}</div>}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${p.countInStock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                                    <div className={`w-3 h-3 rounded-full border-2 border-white ${p.countInStock > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                                                    {p.countInStock > 0 ? `${p.countInStock} In Stock` : 'Depleted'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button onClick={() => handleEdit(p)} className="p-4 bg-white hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 transition-all active:scale-95">
                                                        <Edit size={22} />
                                                    </button>
                                                    <button onClick={() => handleDelete(p._id)} className="p-4 bg-white hover:bg-red-600 text-slate-400 hover:text-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 transition-all active:scale-95">
                                                        <Trash2 size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {loading && (
                                        <tr>
                                            <td colSpan="5" className="p-6 text-center">
                                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-widest">
                                                    <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
                                                    Loading more products...
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && filteredProducts?.length === 0 && (
                    <div className="p-32 text-center space-y-4">
                        <Tag size={80} className="mx-auto text-slate-100 animate-bounce duration-[3s]" />
                        <p className="font-black text-slate-300 uppercase tracking-widest text-sm">No Products Found In Inventory</p>
                    </div>
                )}

                {/* Load More Button */}
                {!loading && page < pages && (
                    <div className="flex justify-center p-8 border-t border-slate-50">
                        <button 
                            onClick={loadMoreHandler}
                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            See More Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
