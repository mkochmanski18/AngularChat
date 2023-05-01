import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../chat.service';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userData: User;
  profilePhotoSrc:string;
  commonFriendList: any;
  error:string = '';

  constructor(
    private cService: ChatService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        const id=params['id'];
        this.userService.getUserData(id)
        .subscribe({
          next:data=>{
            this.userData = data;
            this.profilePhotoSrc=this.userService.getProfilePhotoUrl(data.photo);
          },
          error:err=>{
            if(err.status===404) this.error = err.error.message;
            else this.error = 'An unknown error occurred!';
          }
        });
        this.userService.getCommonFriends(id).subscribe(data=>{
          this.commonFriendList = data;
        })
      }
    );
  }

  onExit(){
    this.cService.profileOff();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }
}
