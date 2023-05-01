import { Component, HostListener } from '@angular/core';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private cService: ChatService
  ){}

  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
    if(window.innerWidth<767) this.cService.mobileOn(); 
    else this.cService.mobileOff();
    }

  ngOnInit(){
    if(window.innerWidth<767) this.cService.mobileOn(); 
    else this.cService.mobileOff();
  }
}
