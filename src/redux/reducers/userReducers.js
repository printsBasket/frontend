import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SEND_OTP_REQUEST,
    USER_SEND_OTP_SUCCESS,
    USER_SEND_OTP_FAIL,
    USER_VERIFY_OTP_REQUEST,
    USER_VERIFY_OTP_SUCCESS,
    USER_VERIFY_OTP_FAIL,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_AUTH_CLEAR_MESSAGES,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        case USER_AUTH_CLEAR_MESSAGES:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userSendOTPReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SEND_OTP_REQUEST:
            return { loading: true };
        case USER_SEND_OTP_SUCCESS:
            return { loading: false, success: true, message: action.payload.message };
        case USER_SEND_OTP_FAIL:
            return { loading: false, error: action.payload };
        case USER_AUTH_CLEAR_MESSAGES:
            return { ...state, error: null, success: false };
        default:
            return state;
    }
};

export const userVerifyOTPReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VERIFY_OTP_REQUEST:
            return { loading: true };
        case USER_VERIFY_OTP_SUCCESS:
            return { loading: false, success: true, message: action.payload.message };
        case USER_VERIFY_OTP_FAIL:
            return { loading: false, error: action.payload };
        case USER_AUTH_CLEAR_MESSAGES:
            return { ...state, error: null, success: false };
        default:
            return state;
    }
};

export const userForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true };
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, success: true, message: action.payload.message };
        case USER_FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_AUTH_CLEAR_MESSAGES:
            return { ...state, error: null, success: false };
        default:
            return state;
    }
};

export const userResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true };
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true, message: action.payload.message };
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_AUTH_CLEAR_MESSAGES:
            return { ...state, error: null, success: false };
        default:
            return state;
    }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};