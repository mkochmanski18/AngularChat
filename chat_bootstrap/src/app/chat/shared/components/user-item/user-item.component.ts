import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { ChatPanelType, UsageType, UserItemType } from '../../interfaces/types.enum';
import { ChatService } from 'src/app/chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input()
  user:User;
  @Input('type')
  itemType:UserItemType=0;
  @Input()
  usage:UsageType;

  profileSrc:string;
  isFriend:boolean=false;

  statement:{text:string,class:string};

  constructor(
    private userService: UserService,
    private cService: ChatService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.profileSrc=this.userService.getProfilePhotoUrl(this.user.photo);
    this.getFriendStatus();
  }
  
  onDelete(){
    if(this.usage===UsageType.INVITATIONS) {
      this.userService.rejectInvitation(this.user.userid)
      .subscribe({
        complete:()=>{
          this.userService.getFriends().subscribe({
            error:(err)=>{
              if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
              if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
              else this.statement = {text:"An unknown error occurred!",class:"alert-danger"};
            }
          });
          this.userService.getInvitations().subscribe({
            error:(err)=>{
              if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
              if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
              else this.statement = {text:"An unknown error occurred!",class:"alert-danger"};
            }
          });
        }
      }
      );
    }
    else if(this.usage===UsageType.FRIENDS) {
      this.userService.deleteFriend(this.user.userid)
      .subscribe({
        error:(err)=>{
          if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
          if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
          else this.statement = {text:"An unknown error occurred!",class:"alert-danger"};
        }
      });
    }
  }
  onAdd(){
    if(this.usage===UsageType.SEARCH) {
      this.userService.inviteFriend(this.user.userid)
      .subscribe({
        error:(err)=>{
          if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
          if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
          else this.statement = {text:"An unknown error occurred!",class:"alert-danger"};
        },
        complete:()=>{
          this.userService.getInvitations();
          this.getFriendStatus();
          this.statement = {text:"User invited!",class:"alert-success"};
        },
      })
    }
    else if(this.usage===UsageType.INVITATIONS) {
      this.userService.acceptInvitation(this.user.userid)
      .subscribe({
        error:err=>{
          if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
        },
        next:response=> {
          this.userService.getFriends();
          this.userService.getInvitations();
          this.statement = {text:"Invitation confirmed!",class:"alert-success"};
        }
      }
      );
    }
  }
  
  getFriendStatus(){
    this.userService.isUserYourFriend(this.user.userid)
    .subscribe({
      error:(err)=>{
        if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
        else this.statement = {text:err.error.message,class:"alert-danger"};
      },
      next:(status)=>{
        (status===0||status===1)?this.isFriend=false:this.isFriend=true
      },
    })
  }

  onProfile(){
    this.cService.profileOn();
    console.log('profile');
    
    this.router.navigate(['/chat/'+this.userService.userData.userid+'/profile/user/'+this.user.userid]);
  }
  onClick(){
    if(this.itemType===0){
      this.userService.setConversation(this.user.userid)
      .subscribe({
        error:(err)=>{
          if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
          if(err.status===403) this.router.navigate(['.'], { relativeTo: this.route.parent })
          else this.statement = {text:'An unknown error occurred!',class:"alert-danger"};
        }
      });
      
      this.cService.changeChatFn(ChatPanelType.MESSAGE);
    }
  }
}
