import {addUser} from '../models/user.model.js';
import {v4 as uuidv4} from 'uuid';
import {handleConnection, handleDisconnect, handlerEvent} from './helper.js';

const registerHandler = (io) => {
    io.on('connection', (socket) => {
        //최초 커넥션 이후 발생 이벤트
        const userUUID = uuidv4();
        addUser({ uuid: userUUID, socketId: socket.id });
        handleConnection(socket, userUUID);
        //event 발생 시 핸들러 배정
        socket.on('event', (data) => handlerEvent(io, socket, data));
        //접속 해제 이벤트
        socket.on('disconnect', () => handleDisconnect(socket));
    });
};

export default registerHandler;