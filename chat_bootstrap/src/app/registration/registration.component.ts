import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../chat/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @ViewChild('f') loginForm!: NgForm;

  httpError:boolean = false;
  genders = ['male', 'female'];

  statement:{text:string,class:string};

  constructor(
    private authService: AuthService
  ){}

  onSubmit(form: NgForm){
    this.authService.register(form.value)
    .subscribe({
      complete:()=>{this.statement = {text:'Account created successfuly!',class:'alert-success'}},
      error:err=>{
        if(err.status===400) this.statement = {text:err.error.message,class:'alert-danger'}
        else this.statement = {text:'An unknown error occurred!',class:'alert-danger'}
      }
    })
    this.loginForm.reset();
  }
}
