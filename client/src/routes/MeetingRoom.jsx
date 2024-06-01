import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import socket from '../socket';

const MeetingRoom = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const peerRef = useRef();
    const localStreamRef = useRef();
    const [isPeerInitialized, setIsPeerInitialized] = useState(false);

    const { room } = useParams();

    
    useEffect(() => {
        socket.emit('joinRoom', { room });

        const handleUserConnected = async (userId) => {
            if (!isPeerInitialized) {
                await initializePeerConnection(userId);
                setIsPeerInitialized(true);
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;
                localStreamRef.current = stream;
                stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

                const offer = await peerRef.current.createOffer();
                await peerRef.current.setLocalDescription(offer);
                socket.emit('signal', {
                    room,
                    description: peerRef.current.localDescription,
                    userId
                });
            } catch (error) {
                handleError(error);
            }
        };

        const handleSignal = async (data) => {
            if (!isPeerInitialized) {
                await initializePeerConnection(data.userId);
                setIsPeerInitialized(true);
            }

            if (data.description) {
                try {
                    await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.description));
                    if (data.description.type === 'offer') {
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                        localVideoRef.current.srcObject = stream;
                        localStreamRef.current = stream;
                        stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

                        const answer = await peerRef.current.createAnswer();
                        await peerRef.current.setLocalDescription(answer);
                        socket.emit('signal', {
                            room,
                            description: peerRef.current.localDescription,
                            userId: data.userId
                        });
                    }
                } catch (error) {
                    handleError(error);
                }
            } else if (data.candidate) {
                try {
                    await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (error) {
                    handleError(error);
                }
            }
        };

        const initializePeerConnection = (userId) => {
            return new Promise((resolve, reject) => {
                const peer = new RTCPeerConnection();

                peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('signal', {
                            room,
                            candidate: event.candidate,
                            userId
                        });
                    }
                };

                peer.ontrack = (event) => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };

                peerRef.current = peer;
                resolve();
            });
        };

        const handleError = (error) => {
            console.error('Error in WebRTC connection:', error);
        };


        socket.on('user-connected', handleUserConnected);

        socket.on('signal', handleSignal);

        return () => {
            socket.off('user-connected', handleUserConnected);

            socket.off('signal', handleSignal);
        };
    }, [room, isPeerInitialized]);


    return (
        <div className='flex sm:flex-row flex-col justify-start gap-[20px] w-full p-[30px] bg-slate-950'>
            <video ref={localVideoRef} autoPlay playsInline muted className='sm:w-[calc(100%/2-20px)] md:w-[calc(100%/4-20px)] w-full rounded-md' />
            <video ref={remoteVideoRef} autoPlay playsInline muted className='sm:w-[calc(100%/2-20px)] md:w-[calc(100%/4-20px)] w-full rounded-md' />
        </div>
    );
}

export default MeetingRoom;