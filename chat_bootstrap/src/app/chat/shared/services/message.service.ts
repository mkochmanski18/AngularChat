import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject, tap } from "rxjs";
import { ChatService } from "../../chat.service";
import { Chat } from "../interfaces/chat.interface";
import { Message } from "../interfaces/message.interface";
import { ChosenFnType } from "../interfaces/types.enum";
import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

@Injectable({providedIn:'root'})
export class MessageService{

    private conversationList:{conversationid:string,messages:Message[]}[]=[];
    messageListChange = new Subject<Message[]>;

    //private groupMessagesList:Message[];
    //groupListChange = new Subject<Message[]>;
    private function = ChosenFnType.FRIENDS;
    private conversationId:string;

    constructor(
        private userService: UserService,
        private chatService: ChatService,
        private socketService: SocketService,
        private http: HttpClient
        ) {}

    ngOnInit(){
        this.setFunction();
        this.socketService.socket.on("onMessage",(message)=>{
            console.log(message);
        })
    }
    setFunction(){
        this.function = this.chatService.getFn();
        this.function === ChosenFnType.FRIENDS?
        this.conversationId = this.chatService.getChosenCon().conversationid:
        this.conversationId = this.chatService.getChosenGroupid();
    }

    getMessages(){
        console.log(this.conversationList);
        
        this.setFunction();
        const index = this.conversationList.findIndex((el=>el.conversationid===this.conversationId));
        if(index>=0) {
            const list=this.conversationList[index].messages;
            this.messageListChange.next(list);
            return this.messageListChange;
        }
        else{
            return this.http.get<Message[]>(this.userService.apiAdress+'/conversation/messages/'+this.conversationId, { withCredentials: true })
            .pipe(
                map((response:any)=>{
                    var newArray:Message[]=[];
                    for(const object of response){
                        const {content,conversation,date,datetime,messageId,messageType,senderData} = object;
                        newArray.push({id:messageId,content,conversation,date,datetime,type:messageType,author:senderData})
                    }
                    return newArray
                }),
                tap(res=>{
                    this.conversationList.push({conversationid:this.conversationId,messages:res});
                    const messagesList = this.castMessageList();
                    this.messageListChange.next(messagesList);
                })
            );
        }
       
    }
    addMessage(message:any){

        const index=this.conversationList.findIndex(el=>el.conversationid===message.conversation.conversationId);
        
        if(index>=0){
            const conversation:Chat = {
                conversationid: message.conversation.conversationId,
                type: message.conversation.conversationType,
                createdAt: message.conversation.createdAt,
                name: message.conversation.name,
                photo: message.conversation.photo,
                participants: []
            }
            const {messageId,content,date,datetime,messageType,senderData} = message;
            const newMessageObject:Message = {
                content, date, datetime, type: messageType, author: senderData, conversation,id: messageId
            }
            this.conversationList[index].messages.push(newMessageObject);
            if(this.conversationId===message.conversation.conversationId) this.messageListChange.next(this.conversationList[index].messages);
        }
    }
    getImageMessage(id:string){
        return this.userService.apiAdress+'/message/image?messageid='+id;
    }
    castMessageList(){
        for(const list of this.conversationList){
            if(list.conversationid===this.conversationId) return list.messages;
        }
        return [];
    }
    sendMessage(isText:boolean,messageData:string|FormData[],userid:string){
        this.setFunction();
        var responses: string[]=[];
        if(isText){
            const message = {
                senderId: userid,
                conversationId:this.conversationId,
                text:messageData,
                datetime: new Date()
            }
            this.http.post(this.userService.apiAdress+'/message/newText',message, { withCredentials: true })
            .pipe(
                tap(res=>{
                    this.getMessages();
                    
                }))
            .subscribe({
                error:(err)=>{
                    if(err.status===404) responses.push(err.error.message);
                    else responses.push('An unknown error occurred!');
                }
            });
        }
        else{
            const params = new HttpParams()
            .set('userid',userid)
            .set('conversationid',this.conversationId);
            for(const image of messageData){
                this.http.post(this.userService.apiAdress+'/message/newImage',image,{
                    params,withCredentials:true
                })
                .pipe(
                    tap(res=>{
                        this.getMessages();
                    }))
                .subscribe({
                    error:(err)=>{
                        if(err.status===404) responses.push(err.error.message);
                        else responses.push('An unknown error occurred!');
                    }
                });
            }
        }
        return responses;
    }
}