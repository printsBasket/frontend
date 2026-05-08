import {
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_RESET,
    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_FAIL,
    PRODUCT_DELETE_REVIEW_RESET,
} from '../constants/productConstants';

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const productReviewUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_UPDATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const productReviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
