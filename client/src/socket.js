import { io } from 'socket.io-client';

const socket = io('https://gsma-server.vercel.app', {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;