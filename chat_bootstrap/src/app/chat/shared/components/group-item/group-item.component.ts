import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/chat/chat.service';
import { GroupService } from '../../services/group.service';
import { Chat } from '../../interfaces/chat.interface';
import { ChatPanelType, UserItemType } from '../../interfaces/types.enum';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent {
  @Input()
  group:Chat;
  @Input('type')
  itemType:UserItemType=0;
  
  @Input()
  showPopover:boolean=false;
  popoverSite:string;
  mobileSub: Subscription;

  statement:{text:string,class:string};

  constructor(
    private cService: ChatService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.popoverSite = this.cService.getMobile()?"bottom":"left";
    this.mobileSub = this.cService.mobileChange.subscribe(change=>this.popoverSite = change?"bottom":"left");

  }
  ngOnDestroy(){
    this.mobileSub.unsubscribe();
  }

  onDelete(){
    this.groupService.deleteGroup(this.group.conversationid)
    .subscribe({
      error:(err)=>{
        if(err.status===404 || err.status===403) this.statement = {text:err.error.message,class:"alert-danger"};
        if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
        else this.statement = {text:"An unknown error occurred!",class:"alert-danger"};
      },
      complete:()=>this.statement = {text:"Group deleted",class:"alert-warning"}
    });
    
  }
  onProfile(){
    this.cService.profileOn();
    this.router.navigate(['profile/group/',this.group.conversationid],{relativeTo:this.route})
  }
  onClick(){
    if(this.itemType===0){
      this.groupService.setConversation(this.group);
      this.cService.changeChatFn(ChatPanelType.MESSAGE);
    }
  }
}
