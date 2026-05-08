import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// Import Reducers
import {
    userLoginReducer,
    userRegisterReducer,
    userSendOTPReducer,
    userVerifyOTPReducer,
    userForgotPasswordReducer,
    userResetPasswordReducer,
    userDetailsReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
} from './reducers/productReducers';
import { productReviewCreateReducer, productReviewUpdateReducer, productReviewDeleteReducer } from './reducers/productReviewReducer';
import {
    categoryListReducer,
    categoryCreateReducer,
    categoryUpdateReducer,
    categoryDeleteReducer
} from './reducers/categoryReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer } from './reducers/orderReducers';
import { cartReducer } from './reducers/cartReducers';
import { analyticsReducer } from './reducers/analyticsReducers';
import { chatListReducer, chatDetailsReducer, chatSendMessageReducer, chatMarkReadReducer } from './reducers/chatReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userSendOTP: userSendOTPReducer,
    userVerifyOTP: userVerifyOTPReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewUpdate: productReviewUpdateReducer,
    productReviewDelete: productReviewDeleteReducer,
    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
    analytics: analyticsReducer,
    chatList: chatListReducer,
    chatDetails: chatDetailsReducer,
    chatSendMessage: chatSendMessageReducer,
    chatMarkRead: chatMarkReadReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const composeEnhancers =
    (import.meta.env.DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    ((f) => f);

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
