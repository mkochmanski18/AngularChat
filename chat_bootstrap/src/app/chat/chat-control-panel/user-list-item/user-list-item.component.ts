import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent {

  userList:User[];
  uListSub: Subscription;

  constructor(
    private userService: UserService){}

  ngOnInit(){
    this.uListSub = this.userService.listChange
    .subscribe(list=>this.userList=list);
  }
  ngOnDestroy(){
    this.uListSub.unsubscribe();
  }
}
