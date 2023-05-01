import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-userdata-form',
  templateUrl: './userdata-form.component.html',
  styleUrls: ['./userdata-form.component.css']
})
export class UserdataFormComponent {
  userData:User;
  uDataSub: Subscription;

  settingsForm: FormGroup;
  genders = ['male', 'female'];

  isPhotoEdited:boolean = false;
  profilePhotoSrc:string;
  uploadedImage:File;

  dataUpdateError: string = '';
  dataUpdateSuccess: string = '';
  imageUpdateError: string = '';
  imageUpdateSuccess: string = '';

  constructor(
    private userService: UserService,
    private router:Router,
  ){}

  onUpdatePhoto(){
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage, this.uploadedImage.name);
    this.userService.updateProfilePhoto(imageFormData)
    .subscribe({
      error: (err)=>{
        if(err.status === 404) this.imageUpdateError = err.error.message;
        if(err.status===403) this.router.navigate(['../../'])
        else this.imageUpdateError = 'An unknown error occurred!';

        this.imageUpdateSuccess='';
      },
      complete: ()=>{
        this.imageUpdateSuccess = 'Image uploaded successfully';
        this.imageUpdateError = '';
      }
    });
    this.isPhotoEdited = false;
  }

  async changeSrc(event:any){
    this.uploadedImage = event.target.files[0];
    this.isPhotoEdited = true;
  }

  onSubmit(){
    const userdata:{username:string,email:string,firstname:string,lastname:string,gender:string} = this.settingsForm.value;
    this.userService.updateUserdata(userdata)
    .subscribe({
      error: (err)=>{
        if(err.status === 400) this.dataUpdateError = err.error.message;
        if(err.status===403) this.router.navigate(['../../'])
        else this.dataUpdateError = 'An unknown error occurred!';

        this.dataUpdateSuccess='';
      },
      complete: ()=>{
        this.dataUpdateSuccess = 'Data updated successfully';
        this.dataUpdateError = '';
      }
    });
  }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'firstname': new FormControl(null,Validators.required),
      'lastname': new FormControl(null,Validators.required),
      'gender': new FormControl('male'),
    });
    
    this.uDataSub = this.userService.userChange.subscribe(
      userdata=>{
        this.settingsForm.setValue({
          'username': userdata.name,
          'email':userdata.email,
          'firstname': userdata.firstname,
          'lastname': userdata.lastname,
          'gender':userdata.sex
        });
        this.profilePhotoSrc=this.userService.getProfilePhotoUrl();
      }
    )
    if(this.uDataSub){
      this.profilePhotoSrc=this.userService.getProfilePhotoUrl();
      this.userData = this.userService.userData;
      this.settingsForm.setValue({
        'username': this.userData.name,
        'email':this.userData.email,
        'firstname': this.userData.firstname,
        'lastname': this.userData.lastname,
        'gender':this.userData.sex
      });
    }

  }

  ngOnDestroy(){
    this.uDataSub.unsubscribe;
  }
  
}
