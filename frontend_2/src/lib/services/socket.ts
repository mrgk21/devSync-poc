import { socketConnected, socketId } from '$lib/stores';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:4200');

socket.on("connect", () => {
    socketConnected.set(true);
    socketId.set(socket.id);
});
socket.on("disconnect", () => {
    socketConnected.set(false);
});


