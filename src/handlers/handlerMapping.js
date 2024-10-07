import { CLIENT_VERSION } from '../constants.js';
import { createStage, getStage, setStage } from '../models/stage.model.js';
import { getUser, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket) => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
    console.log(`Current user:`, getUsers());
};

export const handleConnection = (socket, uuid) => {
    console.log('New connection:', uuid, 'with socket ID:', socket.id);
    console.log('Current user:', getUsers());

    const clientVersion = socket.handshake.query.clientVersion;
    
    if (!CLIENT_VERSION.includes(clientVersion)) {
        console.log(`Connection rejected: Unsupported client version (${clientVersion})`);
        socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
        socket.disconnect();
        return;
    }

    createStage(uuid);

    socket.emit('connection', { uuid });
};

export const handlerEvent = (io, socket, data) => {
    if (!CLIENT_VERSION.includes(data.clientVersion)) {
        socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
        return;
    }

    const handler = handlerMappings[data.handlerId];
    if (!handler) {
        socket.emit('response', { status: 'fail', message: 'Handler not found' });
        return;
    }

    const response = handler(data.userId, data.payload);
    
    if (response.broadcast) {
        io.emit('response', 'broadcast');
        return;
    }
    
    socket.emit('response', response);
};import { gameEnd, gameStart } from "./game.handler.js";
import { moveStageHandler } from "./stage.handler.js";

const handlerMappings = {
    2: gameStart,
    3: gameEnd,
    11: moveStageHandler
};

export default handlerMappings;