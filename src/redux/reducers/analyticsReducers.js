import {
    ANALYTICS_REQUEST,
    ANALYTICS_SUCCESS,
    ANALYTICS_FAIL,
} from '../actions/analyticsActions';

export const analyticsReducer = (state = { analytics: null }, action) => {
    switch (action.type) {
        case ANALYTICS_REQUEST:
            return { loading: true };
        case ANALYTICS_SUCCESS:
            return { loading: false, analytics: action.payload };
        case ANALYTICS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
