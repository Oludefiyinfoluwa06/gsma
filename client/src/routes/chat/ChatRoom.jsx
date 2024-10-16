import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import socket from '../../socket';
import { HiMiniPaperAirplane } from "react-icons/hi2";

const ChatRoom = () => {
    const { room } = useParams();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://gsma-server.vercel.app/api/chats/${room}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [room, token]);

    useEffect(() => {
        socket.emit('joinRoom', { room });

        socket.on('chatMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, [room]);

    useEffect(() => {
        const fetchOtherUser = async (userId) => {
            try {
                const response = await axios.get(`https://gsma-server.vercel.app/api/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setOtherUser((prevOtherUser) => ({
                    ...prevOtherUser,
                    [userId]: response.data.profile.username
                }));
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const uniqueUserIds = [...new Set(messages.map(msg => msg.user))];
        uniqueUserIds.forEach(userId => {
            if (!otherUser[userId] && userId !== user._id) {
                fetchOtherUser(userId);
            }
        });
    }, [messages, token, user._id, otherUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (message.trim()) {
            try {
                const response = await axios.post('https://gsma-server.vercel.app/api/chats', {
                    room,
                    message
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                socket.emit('chatMessage', response.data);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen p-6 bg-gray-900 text-white">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2 no-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`p-2 rounded-md max-w-xs break-words ${
                            msg.user === user._id
                                ? 'bg-blue-500 ml-auto text-right'
                                : 'bg-gray-700 mr-auto text-left'
                        }`}
                    >
                        <strong>{msg.user === user._id ? 'You' : otherUser[msg.user] || 'Unknown User'}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                    className="flex-1 p-2 rounded-md text-black mr-2 outline-none"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-md"
                    disabled={message === ''}
                >
                    <HiMiniPaperAirplane />
                </button>
            </form>
        </div>
    );
};

export default ChatRoom;
