import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { SettingFeatureType } from '../shared/interfaces/types.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  mobile: boolean;
  mobileSubscription:Subscription;
  feature: SettingFeatureType = SettingFeatureType.USERDATA;

constructor(
  private cService: ChatService,
  private route: ActivatedRoute,
  private router: Router
){}

  ngOnInit() {
    this.mobileSubscription = this.cService.mobileChange.subscribe(
      cMobile=>this.mobile = cMobile
    )
    this.mobile = this.cService.getMobile();
    
  }
  gOnDestroy(){
    this.mobileSubscription.unsubscribe();
  }
  
  onExit(){
    this.cService.configurationOff();
    //this.router.navigate(['../'],{relativeTo:this.route})
  }
  
  onChangeFreature(fn:SettingFeatureType){
    this.feature = fn;
  }
}
