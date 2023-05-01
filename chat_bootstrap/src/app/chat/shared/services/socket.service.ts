import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";

@Injectable({providedIn:'root'})
export class SocketService{

    constructor(){}
    socket:Socket = io('http://localhost:5000',{withCredentials: true});
}