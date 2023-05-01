import { Component, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-typing-interface',
  templateUrl: './typing-interface.component.html',
  styleUrls: ['./typing-interface.component.css']
})
export class TypingInterfaceComponent {

  typedText:string='';
  isEmojiPickerVisible: boolean;   
  pickedImages:any[]=[];
  enableTyping:boolean=true;
  
  photoSrc:string|ArrayBuffer|null;
  uploadedImages:File[];

  errors:string[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ){}

  addEmoji(event: { emoji: { native: any; }; }) {
     this.typedText = `${this.typedText}${event.emoji.native}`;
     this.isEmojiPickerVisible = false;
  }
  onSend(){
    if(this.enableTyping) {
      this.errors = this.messageService.sendMessage(this.enableTyping,this.typedText,this.userService.userData.userid)
      this.typedText = '';
    }
    else {
      var images:FormData[]=[];
      for(const uploadedImage of this.uploadedImages){
        const imageFormData = new FormData();
        imageFormData.append('file', uploadedImage, uploadedImage.name);
        images.push(imageFormData);
      }
      this.messageService.sendMessage(this.enableTyping,images,this.userService.userData.userid);
      this.enableTyping = true;
      this.pickedImages = [];
    }
  }
  changeImage(event:any){
    this.uploadedImages = event.target.files;
    var reader = new FileReader();
    reader.onload = ()=>{
      this.pickedImages.push(reader.result);
    };
    [...event.target.files].forEach((element:Blob) => {
      reader.readAsDataURL(element);
    });
    this.enableTyping=false;
  }
  deleteImage(index:number){
    this.pickedImages.splice(index,1);
    if(this.pickedImages.length===0)this.enableTyping=true;
  }
}
