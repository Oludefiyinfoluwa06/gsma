import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';

const Chat = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(`https://gsma-server.vercel.app/api/chats/search/${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setResults(response.data.users);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    };

    const handleNavigate = (userId) => {
        navigate(`/chats/${userId}`);
    };

    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            <form onSubmit={handleSearch} className='mb-4 relative'>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for event chats by creator's username..."
                    className='w-full p-2 rounded-md outline-none text-black'
                />
                <button type='submit' className='mt-1 p-2 bg-blue-500 text-white rounded-md absolute right-1'>
                    <FaSearch />
                </button>
            </form>

            <div className='search-results'>
                {results.length > 0 ? (
                    results.map((user) => (
                        <div
                            key={user._id}
                            className='p-2 mb-2 bg-gray-800 rounded-md cursor-pointer'
                            onClick={() => handleNavigate(user._id)}
                        >
                            <p>{user.lastname} {user.firstname}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default Chat;
