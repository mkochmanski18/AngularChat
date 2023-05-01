import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from '../../shared/services/group.service';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent {
  groupList:any;
  gListSub: Subscription;

  error:string='';

  constructor(
    private groupService: GroupService,
    private router:Router,
  ){}

  ngOnInit(){
    this.gListSub= this.groupService.chatChange.subscribe(
      list=>this.groupList=list
    )
    this.groupService.getGroups()
    .subscribe({
      error:(err)=>{
        if(err.status===404) this.error = err.error.message;
        if(err.status===403) this.router.navigate(['../../'])
        else this.error = 'An unknown error occurred!';
      }
    })
    
  }
  ngOnDestroy(){
    this.gListSub.unsubscribe();
  }
}
