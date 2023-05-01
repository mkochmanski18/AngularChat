import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChatService } from '../../chat.service';
import { GroupService } from '../../shared/services/group.service';
import { Chat } from '../../shared/interfaces/chat.interface';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent {
  groupData:Chat;
  profilePhotoSrc:string;
  error:string = '';
  
  constructor(
    private cService: ChatService,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        const id=params['id'];
        this.groupService.getGroupData(id)
        .subscribe({
          next:data=>{
            this.groupData=data;
          },
          error:err=>{
            if(err.status===404) this.error = err.error.message;
            if(err.status===403) this.router.navigate(['../../'])
            else this.error = 'An unknown error occurred!';
          }
        })
      }
    );
  }

  onExit(){
    this.cService.profileOff();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }
}
