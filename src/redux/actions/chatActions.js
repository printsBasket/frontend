import api from '../../lib/api';

export const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST';
export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
export const CHAT_LIST_FAIL = 'CHAT_LIST_FAIL';

export const CHAT_DETAILS_REQUEST = 'CHAT_DETAILS_REQUEST';
export const CHAT_DETAILS_SUCCESS = 'CHAT_DETAILS_SUCCESS';
export const CHAT_DETAILS_FAIL = 'CHAT_DETAILS_FAIL';

export const CHAT_SEND_MESSAGE_REQUEST = 'CHAT_SEND_MESSAGE_REQUEST';
export const CHAT_SEND_MESSAGE_SUCCESS = 'CHAT_SEND_MESSAGE_SUCCESS';
export const CHAT_SEND_MESSAGE_FAIL = 'CHAT_SEND_MESSAGE_FAIL';

export const CHAT_MARK_READ_REQUEST = 'CHAT_MARK_READ_REQUEST';
export const CHAT_MARK_READ_SUCCESS = 'CHAT_MARK_READ_SUCCESS';
export const CHAT_MARK_READ_FAIL = 'CHAT_MARK_READ_FAIL';

// Get all chats (admin)
export const fetchAllChats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await api.get(`/chats`, config);

        dispatch({
            type: CHAT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Get user's chat
export const fetchUserChat = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await api.get(`/chats/my`, config);

        dispatch({
            type: CHAT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Get chat by ID
export const fetchChatById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await api.get(`/chats/${id}`, config);

        dispatch({
            type: CHAT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Send message
export const sendChatMessage = (chatId, message) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await api.post(
            `/chats/${chatId}/messages`,
            { message },
            config
        );

        dispatch({
            type: CHAT_SEND_MESSAGE_SUCCESS,
            payload: data,
        });

        // Update chat details
        dispatch({
            type: CHAT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_SEND_MESSAGE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Mark as read
export const markChatAsRead = (chatId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_MARK_READ_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await api.put(`/chats/${chatId}/read`, {}, config);

        dispatch({
            type: CHAT_MARK_READ_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CHAT_MARK_READ_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
