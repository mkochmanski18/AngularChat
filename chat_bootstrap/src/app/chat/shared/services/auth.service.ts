import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { User } from "../interfaces/user.interface";
import { UserService } from "./user.service";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(
        private http: HttpClient,
        private userService: UserService,
    ){}

    status(){
        return this.http.get<User>(this.userService.apiAdress+'/auth/status',{
            withCredentials: true,
        });
    }

    register(formData:{username:string,firstname:string,lastname:string,email:string,gender:string,password:string,reapetedPassword:string}){
        const requestBody={
            name:formData.username,
            firstname:formData.firstname,
            lastname:formData.lastname,
            sex:formData.gender,
            email:formData.email,
            pwd:formData.password
        }
        return this.http.post(this.userService.apiAdress+'/user/registration',{requestBody}, { withCredentials: true });
        
    }

    login(loginData:{email:string,password:string}){
        const requestBody={
            email:loginData.email,
            password:loginData.password
        }
        return this.http.post<User>(this.userService.apiAdress+'/auth/login',{...requestBody}, { withCredentials: true })
        .pipe(
            tap((res:User)=>{
            this.userService.userData=res;
            this.userService.userChange.next(res);
            }),
            )
    }
    logout(){
        return this.http.get(this.userService.apiAdress+'/auth/logout', { withCredentials: true });
    }
}