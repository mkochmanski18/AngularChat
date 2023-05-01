import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../chat/shared/interfaces/user.interface';
import { AuthService } from '../chat/shared/services/auth.service';
import { UserService } from '../chat/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('f') loginForm!: NgForm;

  httpError:boolean = false;
  error:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  ngOnInit(){
    this.authService.status()
    .subscribe({
      next:(res:User)=>{
        this.router.navigate(['/chat/'+res.userid])
      },
      error:err=>{}
    })  
  }

  onSubmit(form: NgForm){
    this.authService.login(form.value)
    .subscribe({
      next:(res)=>{
        this.router.navigate(['/chat/'+res.userid],{relativeTo:this.route})
      },
      error:err=>{
        if(err.status===401||err.status===406) this.error = err.error.message;
        else this.error = 'An unknown error occurred!';
      }
    });
  }
}
