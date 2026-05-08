import api from '../../lib/api';

export const ANALYTICS_REQUEST = 'ANALYTICS_REQUEST';
export const ANALYTICS_SUCCESS = 'ANALYTICS_SUCCESS';
export const ANALYTICS_FAIL = 'ANALYTICS_FAIL';

export const fetchAnalytics = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ANALYTICS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await api.get(`/dashboard/analytics`, config);

        dispatch({
            type: ANALYTICS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ANALYTICS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
