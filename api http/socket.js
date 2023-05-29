import { Server } from "socket.io";

export const socket = {}
export function connectWS(server){
    //server es del return de server.listen()
    socket.io = new Server(server);
} 