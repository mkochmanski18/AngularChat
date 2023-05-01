import { HostListener, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Chat } from "./shared/interfaces/chat.interface";
import { ChatPanelType, ChosenFnType } from "./shared/interfaces/types.enum";


@Injectable({providedIn:'root'})
export class ChatService{
    apiAdress:string = "http://192.168.20.110:5000";

    private chatFn:ChatPanelType=ChatPanelType.CONTROL;
    chatFnChange = new Subject<ChatPanelType>();

    private mobile:boolean = false;
    mobileChange = new Subject<boolean>();

    private configuration:boolean = false;
    configurationChange = new Subject<boolean>();
    
    private profile: boolean = false;
    profileChange = new Subject<boolean>();

    private chosenFn:ChosenFnType = ChosenFnType.FRIENDS;
    fnChange = new Subject<ChosenFnType>();
    
    private chosenConversation:Chat;
    chosenConChange = new Subject<Chat>();

    private chosenGroupidConversation:string;
    chosenGroupConChange = new Subject<string>();
    
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
    if(window.innerWidth<767) this.mobile= true; 
    else this.mobile = false;
    this.mobileChange.next(this.mobile);
    }

    getChatFn(){
        return this.chatFn;
    }
    changeChatFn(fn: ChatPanelType){
        if(this.chatFn!==fn) {
            this.chatFn=fn;
            this.chatFnChange.next(this.chatFn);
        }
    }

    getMobile(){
        return this.mobile;
    }
    mobileOn(){
        this.mobile=true;
        this.mobileChange.next(this.mobile);
    }
    mobileOff(){
        this.mobile=false;
        this.mobileChange.next(this.mobile)
    }

    getConfiguration(){
        return this.configuration;
    }
    configurationOn(){
        this.configuration = true;
        this.configurationChange.next(this.configuration);    
    }
    configurationOff(){
        this.configuration = false;
        this.configurationChange.next(this.configuration);  
    }

    getProfileValue(){
        return this.profile;
    }
    profileOn(){
        this.profile = true;
        this.profileChange.next(this.profile);
    }
    profileOff(){
        this.profile = false;
        this.profileChange.next(this.profile);
    }

    getFn(){
        return this.chosenFn;
    }
    onFnChange(fn:ChosenFnType){
        this.chosenFn = fn;
        this.fnChange.next(this.chosenFn);
      }

    getChosenCon(){
        return this.chosenConversation;
    }

    setConversation(conv: Chat){
        this.chosenConversation = conv;
        this.chosenConChange.next(this.chosenConversation);
    }
    getChosenGroupid(){
        return this.chosenGroupidConversation;
    }
    changeGroupCon(id:string){
        this.chosenGroupidConversation = id;
        this.chosenGroupConChange.next(this.chosenGroupidConversation);
    }
}