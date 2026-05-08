import api from '../../lib/api';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

// Helper: sync current cart to backend DB
const syncCartToDB = async (getState) => {
    const { userLogin: { userInfo }, cart: { cartItems } } = getState();
    if (!userInfo?.token) return;
    try {
        await api.put(
            `/cart`,
            { items: cartItems },
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
    } catch (e) {
        // Silent fail — localStorage is still the fallback
    }
};

export const addToCart = (idOrSlug, qty) => async (dispatch, getState) => {
    // Use allProducts cache if available to avoid API call
    const { productList } = getState();
    const cached = (productList.allProducts || []).find(
        p => p._id === idOrSlug || p.slug === idOrSlug
    );

    let item;
    if (cached) {
        item = {
            product: cached._id,
            title: cached.title,
            image: cached.images && cached.images.length > 0 ? cached.images[0] : '',
            price: cached.price,
            countInStock: cached.countInStock,
            slug: cached.slug,
            qty,
        };
    } else {
        const { data } = await api.get(`/products/${idOrSlug}`);
        item = {
            product: data._id,
            title: data.title,
            image: data.images && data.images.length > 0 ? data.images[0] : '',
            price: data.price,
            countInStock: data.countInStock,
            slug: data.slug,
            qty,
        };
    }

    dispatch({ type: CART_ADD_ITEM, payload: item });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    await syncCartToDB(getState);
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    await syncCartToDB(getState);
};

// Fetch cart from DB on login and merge with any guest (local) cart items
export const fetchCartFromDB = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    if (!userInfo?.token) return;
    try {
        // Capture guest cart items before overwriting
        const guestItems = [...getState().cart.cartItems];

        const { data } = await api.get(`/cart`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        const dbItems = data || [];

        // Merge: start with DB items, then add guest items not already in DB
        const merged = [...dbItems];
        guestItems.forEach(guestItem => {
            if (!merged.find(i => i.product === guestItem.product)) {
                merged.push(guestItem);
            }
        });

        if (merged.length > 0) {
            dispatch({ type: CART_CLEAR_ITEMS });
            merged.forEach(item => {
                dispatch({ type: CART_ADD_ITEM, payload: item });
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
            // Sync merged cart back to DB
            await syncCartToDB(getState);
        }
    } catch (e) {
        // Silent fail — keep local cart
    }
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
