import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  
  mobile: boolean;
  mobileSub: Subscription;

  constructor(
    private cService: ChatService,
    private userService: UserService,
  ){}
  
  ngOnInit(){
    this.mobileSub = this.cService.mobileChange
    .subscribe(newMobile => this.mobile = newMobile);
    this.mobile = this.cService.getMobile();
  }
  ngOnDestroy(){
    this.mobileSub.unsubscribe();
  }
  
}
