import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { User } from 'src/app/chat/shared/interfaces/user.interface';
import { ChatService } from '../chat.service';
import { GroupService } from '../shared/services/group.service';
import { Chat } from '../shared/interfaces/chat.interface';
import { ChatPanelType, ChosenFnType } from '../shared/interfaces/types.enum';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-chat-control-panel',
  templateUrl: './chat-control-panel.component.html',
  styleUrls: ['./chat-control-panel.component.css']
})
export class ChatControlPanelComponent {
  userData: User;
  uDataSub: Subscription;

  userList:User[];
  uListSub: Subscription;
  groupList: Chat[];
  gListSub: Subscription;

  chosenFn: ChosenFnType;
  fnSub: Subscription;

  profilePhotoSrc:string;

  mobile: boolean = false;
  mobileSub: Subscription;
  

  constructor(
    private cService: ChatService,
    private userService: UserService,
    private groupService: GroupService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  OnSettings(){
    this.cService.configurationOn();
    //this.router.navigate(['settings/userdata'],{relativeTo:this.route})
  }

  onClick(){
    console.log(this.userData)
  }

  onFnChange(fn:ChosenFnType){
    this.chosenFn = fn;
  }

  onChangePanel(){
    this.cService.changeChatFn(ChatPanelType.MESSAGE);
  }

  onLogout(){
    this.authService.logout()
    .subscribe({
      next:()=>{
        this.router.navigate(['.'], { relativeTo: this.route.parent })},
      error:err=>{
        if(err.status===200)this.router.navigate(['.'], { relativeTo: this.route.parent })
        else console.log(err)
      }
    })
  }

  ngOnInit() {
    this.route.params
    .pipe(tap(params=>this.userService.setup(params['userid'])))
    .subscribe({
      complete:()=>this.userService.getData().subscribe(res=>console.log(res)),
      error:err=>{
        console.log(err);
        
        this.router.navigate(['../../'])}
    });

    
    this.mobileSub = this.cService.mobileChange
    .subscribe(newMobile => this.mobile = newMobile);

    this.uDataSub = this.userService.userChange
    .subscribe(data=>{
      this.userData=data;
      this.profilePhotoSrc=this.userService.getProfilePhotoUrl();

      this.uListSub = this.userService.listChange
      .subscribe(list=>this.userList=list);

      this.gListSub = this.groupService.chatChange
      .subscribe(list=>this.groupList=list)
    });
    this.mobile = this.cService.getMobile();
    this.fnSub = this.cService.fnChange.subscribe(fn=>this.chosenFn=fn);
    this.chosenFn = this.cService.getFn();
  }
  ngOnDestroy(){
    this.mobileSub.unsubscribe();
    this.uDataSub.unsubscribe();
    this.uListSub.unsubscribe();
    this.fnSub.unsubscribe();
  }
}
