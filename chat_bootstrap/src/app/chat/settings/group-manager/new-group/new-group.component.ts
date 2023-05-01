import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/chat/shared/interfaces/user.interface';
import { GroupService } from 'src/app/chat/shared/services/group.service';
import { UserService } from 'src/app/chat/shared/services/user.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent {
  groupForm: FormGroup;
  friendList: User[];
  activeSelectControl:number;
  error:string = '';
  statement:{text:string,class:string};
  
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
  ){}
  ngOnInit() {
    this.groupForm = new FormGroup({
      'groupname': new FormControl(null,Validators.required),
      'participants': new FormArray([],this.forbiddenUsers.bind(this))
    });
    this.getFriends()
    this.activeSelectControl = this.groupForm.value.participants.length-1;
  }

    onSubmit(){
      console.log(this.groupForm.value);
      const {groupname,participants} = this.groupForm.value;
      this.groupService.createGroup(groupname,participants)
      .subscribe({
        error:(err)=>{
          if(err.status===404) this.statement = {text:err.error.message,class:"alert-danger"};
          if(err.status===403) this.router.navigate(['../../'])
          else this.statement = {text:'An unknown error occurred!',class:"alert-danger"};
        },
        complete:()=> {
          this.statement = {text:'Group created!',class:"alert-success"};
        },
      })
    }
    onParticipantAdd() {
      const control = new FormControl(null, [Validators.required,]);
      (<FormArray>this.groupForm.get('participants')).push(control);
      this.activeSelectControl++;
    }
    getControls() {
      return (<FormArray>this.groupForm.get('participants')).controls;
    }
    getFriends(){
      this.friendList = this.userService.userList;
    }

    isSelected(index:string){
      const selectedUsers=this.groupForm.value.participants;
      for(const id of selectedUsers){
        if(id===index) return true;
      }
      return false;
    }
    getUnselectedFriends(){
      const selectedUsers=this.groupForm.value.participants;
      let unselectedUsers:User[]=[];
      for(const user of this.friendList){
        let found = 0;
        for(const selected of selectedUsers){
          if(user.userid===selected){
            found=1;
            break;
          }
        }
        if(found===0) unselectedUsers.push(user);
      }
      return [...unselectedUsers];
    }
    
    deleteSelection(index:number){
      (<FormArray>this.groupForm.get('participants')).removeAt(index);
      this.activeSelectControl--;
    }

    forbiddenUsers(control: any): ValidatorFn|{ [key: string]: any } | null {
      if(control.value){
        let condition:boolean=false;
        for(let i=0;i<control.value.length-1;i++){
          for(let o=i+1;o<control.value.length;o++){
            if(control.value[i]===control.value[o]) {
              condition=true;
              break;
            }
            if(condition) break;
          }
        }
        return  condition?{duplicate:true}:null;
      }
      return null;
    }
}
