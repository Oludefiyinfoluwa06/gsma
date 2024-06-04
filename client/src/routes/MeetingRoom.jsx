import { useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

import socket from '../socket';

const MeetingRoom = () => {
    const { room } = useParams();
    const user = localStorage.getItem('user');
    
    const myVideoRef = useRef();
    const userVideoRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            myVideoRef.current.srcObject = stream;
        });

        socket.emit('join-room', room, user);

        socket.on('user-connected', (userId) => {
            console.log('User connected: ' + userId);
        });
    }, [room, user]);

    return (
        <div className="w-full flex sm:flex-row flex-col bg-slate-950 p-[20px]">
            <video className='w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/4-20px)] rounded-md' ref={myVideoRef} muted autoPlay playsInline />
            <video className='w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/4-20px)] rounded-md' ref={userVideoRef} autoPlay playsInline />
        </div>
    );
}

export default MeetingRoom;