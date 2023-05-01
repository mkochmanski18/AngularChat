import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { User } from '../../interfaces/user.interface';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.css']
})
export class MessageBlockComponent {
  @Input()
  message:Message;
  profileSrc: string;

  chatUserid:string;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ){}

  ngOnInit(){
    this.chatUserid = this.userService.userData.userid;
    this.profileSrc=this.messageService.getImageMessage(this.message.id);
    this.profileSrc = this.userService.getProfilePhotoUrl(this.message.author.photo);
  }
}
