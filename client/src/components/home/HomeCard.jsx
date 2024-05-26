import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { cardTypeList } from "../../constants";

const HomeCard = () => {
    const [showModal, setShowModal] = useState(false);

    const [eventId, setEventId] = useState('');
    const navigate = useNavigate();
    
    return (
        <>
            <div className="flex items-start justify-start gap-[20px] flex-wrap mt-[20px]">
                {cardTypeList.map(item => (
                    <div key={item.id} className={`md:w-[calc(100%/4-20px)] sm:w-[calc(100%/2-20px)] h-[200px] w-full rounded-md flex items-start justify-between flex-col p-3 cursor-pointer ${item.bgClassName}`} onClick={item.route ? () => navigate(`${item.route}`) : () => setShowModal(true) }>
                        <p className="text-[20px] bg-[rgba(255,255,255,0.35)] p-2 rounded-md">{item.icon}</p>
                        <div>
                            <h1 className="text-[25px] font-bold">{item.title}</h1>
                            <p className="text-[16px]">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className='absolute bg-gradient-to-b from-transparentBlack to-transparentBlack w-full top-0 left-0 h-screen md:p-0'>
                    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white p-[20px] rounded-md md:w-[600px] w-[300px]">
                        <FaTimes className='absolute top-[10px] right-[10px] text-slate-800 cursor-pointer' onClick={() => setShowModal(false)} />

                        <form>
                            <div className="flex flex-col mb-2 gap-3 w-full">
                                <label htmlFor="eventId" className='text-slate-950 text-[25px] font-bold'>Event ID</label>
                                <input
                                    type="text"
                                    name="eventId"
                                    id="eventId"
                                    value={eventId}
                                    onChange={async (e) => {
                                        setEventId(e.target.value);
                                    }}
                                    className="bg-slate-100 outline-none rounded-md text-[16px] text-black p-2"
                                />
                            </div>

                            <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-slate-950">Join</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomeCard;