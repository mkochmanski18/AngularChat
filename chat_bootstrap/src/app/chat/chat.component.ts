import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { ChatPanelType } from './shared/interfaces/types.enum';
import { GroupService } from './shared/services/group.service';
import { MessageService } from './shared/services/message.service';
import { SocketService } from './shared/services/socket.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[UserService]
})
export class ChatComponent {
  chatfn: ChatPanelType;
  chatFnSub: Subscription;

  configuration:boolean;
  cSubscription:Subscription;

  profile:boolean;
  pSubscription: Subscription;
  
  mobile: boolean;
  mobileSubscription:Subscription;

  constructor(
    private cService: ChatService,
    private socketService: SocketService, 
    private userService: UserService,
    private messageService: MessageService,
    private groupService: GroupService
  ){}

  ngOnInit() {
    //socket features
    this.socketService.socket.on("onMessage",(data)=>{
      this.messageService.addMessage(data);
    });
    this.socketService.socket.on("onFriendUpdate",(data)=>{
      this.userService.getFriends().subscribe(list=>{});
      this.userService.getInvitations().subscribe(list=>{})      
    });
    this.socketService.socket.on("onConversationCreate",(data)=>{
      this.groupService.getGroups().subscribe({error:err=>console.log(err)})
    });
    this.socketService.socket.on('onInvitingCreate',()=>{
      this.userService.getInvitations().subscribe({error:err=>console.log(err)})
    });
    
    //others features subscriptions
    this.chatFnSub = this.cService.chatFnChange.subscribe(
      (fn:ChatPanelType)=>this.chatfn=fn
    );
    this.cSubscription = this.cService.configurationChange.subscribe(
      (conf: boolean)=>this.configuration=conf
    );
    this.mobileSubscription = this.cService.mobileChange.subscribe(
      cMobile=>{this.mobile=cMobile}
    );
    this.pSubscription = this.cService.profileChange.subscribe(
      newProfile=>{this.profile=newProfile}
    );

    //features starting values
    this.chatfn = this.cService.getChatFn();
    this.configuration = this.cService.getConfiguration();
    this.profile = this.cService.getProfileValue();
    this.mobile = this.cService.getMobile();
    
  }
  ngOnDestroy(){
    this.cSubscription.unsubscribe();
    this.pSubscription.unsubscribe();
    this.mobileSubscription.unsubscribe();
    this.chatFnSub.unsubscribe();
  }
}
