import {
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    CHAT_DETAILS_REQUEST,
    CHAT_DETAILS_SUCCESS,
    CHAT_DETAILS_FAIL,
    CHAT_SEND_MESSAGE_REQUEST,
    CHAT_SEND_MESSAGE_SUCCESS,
    CHAT_SEND_MESSAGE_FAIL,
    CHAT_MARK_READ_REQUEST,
    CHAT_MARK_READ_SUCCESS,
    CHAT_MARK_READ_FAIL,
} from '../actions/chatActions';

export const chatListReducer = (state = { chats: [] }, action) => {
    switch (action.type) {
        case CHAT_LIST_REQUEST:
            return { loading: true, chats: [] };
        case CHAT_LIST_SUCCESS:
            return { loading: false, chats: action.payload };
        case CHAT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const chatDetailsReducer = (state = { chat: null }, action) => {
    switch (action.type) {
        case CHAT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case CHAT_DETAILS_SUCCESS:
            return { loading: false, chat: action.payload };
        case CHAT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const chatSendMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_SEND_MESSAGE_REQUEST:
            return { loading: true };
        case CHAT_SEND_MESSAGE_SUCCESS:
            return { loading: false, success: true };
        case CHAT_SEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const chatMarkReadReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_MARK_READ_REQUEST:
            return { loading: true };
        case CHAT_MARK_READ_SUCCESS:
            return { loading: false, success: true };
        case CHAT_MARK_READ_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
