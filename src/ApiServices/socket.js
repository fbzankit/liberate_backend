import { io } from 'socket.io-client';
const socketIO = io.connect('http://liberate.avniksofttech.com:8080',{transport:'websocket',reconnectionAttempts: 20,reconnectionDelay: 5000});
// const socketIO = io.connect('http://localhost:8081',{transport:'websocket',reconnectionAttempts: 20,reconnectionDelay: 5000});
export {socketIO};