import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { Chat } from '../shared/interfaces/chat.interface';
import { Message } from '../shared/interfaces/message.interface';
import { ChatPanelType } from '../shared/interfaces/types.enum';
import { User } from '../shared/interfaces/user.interface';
import { MessageService } from '../shared/services/message.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent {
  @Input()
  mobile:boolean;
  @ViewChild('messageContainer',{static:false}) messageContainer:any;

  chosenCon: Chat|undefined;
  chosenConSub: Subscription;
  user:User;
  uSub: Subscription;

  participants:User[];
  singleParticipant:User;

  messages:Message[];
  messageSub:Subscription;
  error: string = '';

  constructor(
    private cService: ChatService,
    private userService: UserService,
    private messageService: MessageService,
  ){}

  ngOnInit(){
    this.uSub = this.userService.userChange.subscribe(user=>this.user=user);
    this.chosenConSub = this.cService.chosenConChange.subscribe(data=>{
      this.chosenCon=data;
      console.log("Chosen");
      
      this.messageService.getMessages()
      .subscribe({
        error:err=>{
          if(err.status===404) this.error = err.error.message;
          else this.error = 'An unknown error occurred!';
        }
      });
      if(this.messageContainer) this.scrollToBottom();
    });
    this.user = this.userService.userData;
    this.chosenCon = this.cService.getChosenCon();
    this.messageSub = this.messageService.messageListChange.subscribe(list=>{this.messages=list})
  }
  
  ngOnDestroy(){
    this.chosenConSub.unsubscribe(); 
    this.messageSub.unsubscribe();
    this.uSub.unsubscribe();
  }
  onGoBack(){
    this.cService.changeChatFn(ChatPanelType.CONTROL);
  }

  scrollToBottom() {
    this.messageContainer.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}
  onExit(){
    this.chosenCon = undefined;
  }
}
