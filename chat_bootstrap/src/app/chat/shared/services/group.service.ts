import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
    HttpClient,
    HttpParams,
    HttpErrorResponse
  } from '@angular/common/http';
import { Chat, ChatTypeEnum } from "../interfaces/chat.interface";
import { map, Subject, tap } from "rxjs";
import { User } from "../interfaces/user.interface";
import { ChatService } from "../../chat.service";

@Injectable({providedIn:'root'})
export class GroupService{
    apiAdress:string = "http://192.168.20.110:5000";
    userid:string;
    chatList: Chat[];
    chatChange = new Subject<Chat[]>()

    constructor(
        private cService: ChatService,
        private http: HttpClient
        ){}

    setup(id:string){
        let error:string = '';
        this.userid=id;
        this.getGroups()
        .subscribe({
            next:list=>{
                this.chatList=list;
                this.chatChange.next(this.chatList)},
            error:err=>error = err.error.message
        });
        if(error)return error;
        else return null;
    }
    getGroupData(id:string){
        return this.http.get<Chat>(this.apiAdress+'/conversation/'+id, { withCredentials: true })
        .pipe(
            map(data=>{
                let newArray:User[]=[];
                const {conversationid,name,createdAt,participants,type,photo} = data;
                participants.forEach(user=>{
                    if(user.userid!==this.userid) newArray.push(user);
                })
                return {conversationid,name,createdAt,participants:newArray,type,photo};
            })
        )
    }
    getGroups(){
        return this.http.get<Chat[]>(this.apiAdress+'/conversation/user/'+this.userid, { withCredentials: true })
        .pipe(
            map((array:any)=>{
                let newArray:Chat[]=[];
                for(const chat of array){
                    const conversationid:string = chat.conversationId;
                    const name:string = chat.name;
                    const createdAt:Date = chat.createdAt;
                    const type:ChatTypeEnum = chat.conversationType;
                    const participants:User[] = chat.participants;
                    const photo:string = chat.photo;

                    newArray.push({conversationid,name,createdAt,type,participants,photo});
                }
                return newArray;
            }),
            tap(list=>{
                this.chatChange.next(list);
                this.chatList=list;
                })
        );  
    }
    createGroup(groupName:string,participants:string[]){
        const postData = {
            name:groupName,
            ownerID:this.userid,
            participants
        }
        return this.http.post(this.apiAdress+'/conversation/participants',postData, { withCredentials: true })
        .pipe(tap(()=>{
            this.getGroups()
            .subscribe(list=>{
                this.chatList = list;
                this.chatChange.next(this.chatList);
            })
        }));
    }
    deleteGroup(id:string){
        return this.http.delete(this.apiAdress+'/conversation/'+id, { withCredentials: true })
        .pipe(tap(()=>{
            this.getGroups().subscribe(list=>{
                this.chatList=list;
                this.chatChange.next(this.chatList);});
        }));
    }
    setConversation(conversation:Chat){
        this.cService.setConversation(conversation);
    }
    
}