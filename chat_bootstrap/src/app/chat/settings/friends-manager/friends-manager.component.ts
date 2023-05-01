import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-friends-manager',
  templateUrl: './friends-manager.component.html',
  styleUrls: ['./friends-manager.component.css']
})
export class FriendsManagerComponent {

  invitationList:any;
  friendList:any;
  searchList:any;

  fListSub: Subscription;
  invSub: Subscription;
  searchValue='';
  error:string='';

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(){

    this.fListSub = this.userService.listChange.subscribe(
      list=>this.friendList=list
    )
    this.invSub = this.userService.invChange.subscribe(
      list=>this.invitationList=list);

    this.friendList = this.userService.userList;
    this.invitationList = this.userService.invitations;
  }
  ngOnDestroy(){
    this.fListSub.unsubscribe();
    this.invSub.unsubscribe();
  }
  onSearch(){
    this.userService.searchUsers(this.searchValue)
    .subscribe({
      next:result=>{this.searchList=result},
      error:(err)=>{
        if(err.status===404) this.error = err.error.message;
        if(err.status===403) this.router.navigate(['../../'])
        else this.error = 'An unknown error occurred!';
      }
    });
  }
}
