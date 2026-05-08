import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllChats, fetchChatById, sendChatMessage, markChatAsRead } from '../../../redux/actions/chatActions';
import { Search, Send, User, MoreVertical, Phone, Video, ChevronLeft, MessageCircle } from 'lucide-react';

const AdminChat = () => {
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [showMobileList, setShowMobileList] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [pollingInterval, setPollingInterval] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatList = useSelector((state) => state.chatList);
    const { loading, chats, error } = chatList;

    const chatDetails = useSelector((state) => state.chatDetails);
    const { chat: currentChat } = chatDetails;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAllChats());

            // Polling every 5 seconds to get updates
            const interval = setInterval(() => {
                dispatch(fetchAllChats());
                if (activeChat) {
                    dispatch(fetchChatById(activeChat._id));
                }
            }, 5000);
            
            setPollingInterval(interval);

            return () => clearInterval(interval);
        }
    }, [dispatch, userInfo, activeChat]);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setShowMobileList(false);
        dispatch(fetchChatById(chat._id));

        // Mark as read
        if (chat.unreadCount > 0) {
            dispatch(markChatAsRead(chat._id));
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        dispatch(sendChatMessage(activeChat._id, newMessage));
        
        // Optimistically fetch chat soon after sending to see our own message reflected
        setTimeout(() => {
            dispatch(fetchChatById(activeChat._id));
        }, 500);

        setNewMessage('');
    };

    const filteredChats = chats?.filter(chat =>
        chat.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
            {/* Sidebar List */}
            <div className={`
                w-full lg:w-80 border-r border-slate-200 flex flex-col bg-white z-10
                ${showMobileList ? 'flex' : 'hidden lg:flex'}
            `}>
                <div className="p-4 border-b border-slate-200">
                    <h2 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                        <MessageCircle size={20} className="text-blue-600" />
                        Customer Chats
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-slate-400">Loading chats...</div>
                    ) : error ? (
                        <div className="p-4 text-center text-red-500">{error}</div>
                    ) : filteredChats.length === 0 ? (
                        <div className="p-4 text-center text-slate-400">No chats found</div>
                    ) : (
                        filteredChats.map(chat => (
                            <button
                                type="button"
                                key={chat._id}
                                onClick={() => handleChatSelect(chat)}
                                className={`w-full text-left p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 ${activeChat?._id === chat._id ? 'bg-blue-50/50' : ''}`}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {chat.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${chat.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-sm text-slate-900 truncate">{chat.user?.name || 'Unknown User'}</h4>
                                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                            {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMessage || 'No messages yet'}</p>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="flex flex-col justify-center">
                                        <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {chat.unreadCount}
                                        </span>
                                    </div>
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`
                flex-1 flex flex-col bg-slate-50/30
                ${!showMobileList ? 'flex' : 'hidden lg:flex'}
            `}>
                {activeChat && currentChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowMobileList(true)}
                                    className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                                >
                                    <ChevronLeft size={20} />
                                    <span className="text-xs font-bold">Back</span>
                                </button>
                                <div className="relative">
                                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {activeChat.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${activeChat.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">{activeChat.user?.name || 'Unknown User'}</h3>
                                    <p className="text-xs text-slate-500">{activeChat.user?.email || ''}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                            {currentChat.messages && currentChat.messages.length > 0 ? (
                                currentChat.messages.map((msg, index) => {
                                    const isAdmin = msg.sender.toString() === userInfo._id;
                                    return (
                                        <div key={index} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${isAdmin
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                                }`}>
                                                <p>{msg.message}</p>
                                                <div className={`text-[10px] mt-1 text-right ${isAdmin ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-slate-400 py-10">No messages yet. Start the conversation!</div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <form onSubmit={handleSend} className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-shadow shadow-md shrink-0"
                                >
                                    <Send size={18} className="translate-x-0.5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                            <p className="font-medium">Select a chat to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
