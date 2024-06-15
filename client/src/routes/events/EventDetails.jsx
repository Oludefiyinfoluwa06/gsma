import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarTimes, FaEllipsisV, FaExclamationCircle, FaPencilAlt, FaShare, FaTimes, FaTrash } from "react-icons/fa";

import { useEvent } from '../../hooks/useEvent';

const EventDetails = () => {
    const { id } = useParams();

    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    const meetingLink = `http://localhost:3000/chats/${user._id}`;

    const { getEventDetails, event, error, setError, deleteEvent } = useEvent();

    const navigate = useNavigate();

    useEffect(() => {
        setError('');
        getEventDetails(id);
    }, [getEventDetails, id, setError]);

    const handleCopyLink = async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(meetingLink);
            setError('');
            alert('Link copied to clipboard!');
        } catch (err) {
            setError('Failed to copy link. Please try again.');
        }
    };

    return (
        <>
            <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
                {error && (
                    <div className="flex items-center justify-center gap-[20px] flex-col min-h-[calc(100vh-100px)]">
                        <FaCalendarTimes className="text-[200px]" />
                        <p>{error}</p>
                    </div>
                )}
                
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="md:text-[30px] text-[23px] font-bold">{event.title}</h1>
                        <div className="relative">
                            <FaEllipsisV className="cursor-pointer" onClick={() => setShowOptions(prev => !prev)} />

                            {showOptions && (
                                <div className="absolute right-[7px] top-[22px] bg-white rounded-md text-slate-950 w-[150px] shadow-md">
                                    {user._id === event.createdBy && <div className="p-2 flex items-center justify-start gap-2 cursor-pointer border-b border-gray-800" onClick={() => navigate(`/events/${id}/edit`)}><FaPencilAlt /> <p>Edit</p></div>}

                                    {user._id === event.createdBy && <div className="p-2 flex items-center justify-start gap-2 cursor-pointer border-b border-gray-800" onClick={() => setShowDeleteModal(true)}><FaTrash /> <p>Delete</p></div>}

                                    <div className="p-2 flex items-center justify-start gap-2 cursor-pointer" onClick={() => setShowModal(true)}><FaShare /> <p>Share</p></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="mt-2">{event.description}</p>

                    {user._id === event.createdBy ? <button className='mt-3 text-[18px] font-bold bg-slate-100 text-slate-800 px-[20px] py-[8px] rounded-lg' onClick={() => navigate(`/chats/${user._id}`)}>Start meeting</button> : <button className='mt-3 text-[18px] font-bold bg-slate-100 text-slate-800 px-[20px] py-[8px] rounded-lg' onClick={() => navigate(`/chats/${user._id}`)}>Join meeting</button>}
                </div>
            </div>

            {showModal && (
                <div className='absolute bg-gradient-to-b from-transparentBlack to-transparentBlack w-full top-0 left-0 h-screen'>
                    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white p-[20px] rounded-md md:w-[600px] w-[300px]">
                        <FaTimes className='absolute top-[10px] right-[10px] text-slate-800 cursor-pointer' onClick={() => {
                            setShowModal(false);
                            setShowOptions(false);
                        }} />

                        <form>
                            {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                            <div className="flex flex-col mb-2 gap-3 w-full">
                                <label htmlFor="meetingLink" className='text-slate-950 font-bold text-[20px]'>Meeting Link</label>
                                <input
                                    type="text"
                                    name="meetingLink"
                                    id="meetingLink"
                                    value={meetingLink}
                                    readOnly
                                    className="bg-slate-100 outline-none rounded-md text-[16px] p-2 text-gray-600"
                                />
                            </div>

                            <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-slate-950" onClick={handleCopyLink}>Copy link</button>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className='absolute bg-gradient-to-b from-transparentBlack to-transparentBlack w-full top-0 left-0 h-screen'>
                    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white p-[20px] rounded-md md:w-[600px] w-[300px]">
                        <FaTimes className='absolute top-[10px] right-[10px] text-slate-800 cursor-pointer' onClick={() => {
                            setShowDeleteModal(false);
                            setShowOptions(false);
                        }} />

                        <div className='flex items-center justify-center flex-col gap-3'>
                            <FaExclamationCircle className="text-[50px] text-red-500" />

                            <p className='text-center'>Are you sure you want to delete this event?</p>

                            <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-red-500" onClick={() => deleteEvent(id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EventDetails;