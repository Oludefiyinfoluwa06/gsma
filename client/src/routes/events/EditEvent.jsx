import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useEvent } from '../../hooks/useEvent';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditEvent = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const { editEvent, error, setError, loading } = useEvent();

    const { id } = useParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const getEventDetails = async () => {
            try { 
                const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setTitle(response.data.event.title);
                setDate(response.data.event.date.split('T')[0]);
                setDescription(response.data.event.description);
            } catch (error) {
                console.log(error);
                setError(error.response.data.error);
            }
        }

        getEventDetails();
    }, [id, setError, token]);
    
    const handleEditEvent = async (e) => {
        e.preventDefault();

        setError('');

        await editEvent(id, title, description, date);
    }
    
    return (
        <div className="w-full overflow-y-auto no-scrollbar p-6 md:pl-2">
            <form className="p-6" onSubmit={handleEditEvent}>
                <legend className="text-[30px] text-white font-bold">Edit Event</legend>

                {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                <div className='flex items-center justify-start gap-4 w-full mt-[15px] flex-wrap sm:flex-nowrap'>
                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="title" className='text-white'>Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setError('');
                                setTitle(e.target.value);
                            }}
                            className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                        />
                    </div>

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="date" className='text-white'>Date</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => {
                                setError('');
                                setDate(e.target.value);
                            }}
                            className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col mb-2 gap-3 w-full">
                    <label htmlFor="description" className='text-white'>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setError('');
                            setDescription(e.target.value);
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px] h-[130px]"
                    ></textarea>
                </div>

                <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-slate-950" disabled={loading}>{loading ? ( <LoadingSpinner /> ): 'Submit'}</button>
            </form>
        </div>
    );
}

export default EditEvent;