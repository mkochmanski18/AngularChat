import { Injectable } from "@angular/core";
import { map, Subject, tap} from "rxjs";
import {
    HttpClient,
    HttpParams,
  } from '@angular/common/http';
import { User } from "../interfaces/user.interface";
import { ChatService } from "../../chat.service";
import { ChatTypeEnum } from "../interfaces/chat.interface";
import { GroupService } from "./group.service";

@Injectable({providedIn:'root'})
export class UserService{
    
    apiAdress:string = "http://192.168.20.110:5000"

    userData:User;
    userList:User[];
    invitations: User[];
    userChange = new Subject<User>();
    listChange = new Subject<User[]>();
    invChange = new Subject<User[]>();

    constructor(
        private cService: ChatService,
        private groupService: GroupService,
        private http: HttpClient
        ) {}

    setup(id:string){
        let errors:string[]=[];
        this.getUserData(id)
        .pipe(tap(res=>{
            this.userData=res;
            this.userChange.next(res);
        }))
        .subscribe({
            complete:()=>{
                this.getInvitations()
                .subscribe({
                    error:err=>errors.push(err.error.message)
                });
        
                this.getFriends()
                .subscribe({
                    error:err=>errors.push(err.error.message)
                });
    
                const gError = this.groupService.setup(this.userData.userid);
                if(gError) errors.push(gError);
            },
            error:err=>{
                errors.push(err.error.message);
            }
        })
        
        if(errors.length>0) return errors;
        return null;
    }
    getData(){
        return this.http.get<User>(this.apiAdress+'/user/search/id/'+this.userData.userid,{ withCredentials: true });
    }
    getUserData(id:string){
        return this.http.get<User>(this.apiAdress+'/user/search/id/'+id, { withCredentials: true });
    }
    getFriends(){
        return this.http.get<User[]>(this.apiAdress+'/friend/list',
        {
            params: new HttpParams().set('userid',this.userData.userid),
            withCredentials:true
        })
        .pipe(tap(res=>{
            this.userList=res;
            this.listChange.next(this.userList);
        }));
        
    }
    getCommonFriends(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id);
        return this.http.get<User[]>(this.apiAdress+'/friend/commonlist',{params,withCredentials:true})
    }
    updateUserdata(data:{username:string,email:string,firstname:string,lastname:string,gender:string}){
        return this.http.patch(this.apiAdress+'/user/fulldata',data,{
            params: new HttpParams().set('userid',this.userData.userid),
            withCredentials:true
        })
        .pipe(tap(res=>{
            this.userData.name = data.username;
            this.userData.firstname = data.firstname;
            this.userData.lastname = data.lastname;
            this.userData.email = data.email;
            this.userData.sex = data.gender;
            this.userChange.next(this.userData);
        }));
    }
    getProfilePhotoUrl(photoName:string|undefined=undefined){
        if(photoName===undefined) {
            return this.apiAdress+'/user/photo/'+this.userData.photo;
        }else {
            return this.apiAdress+'/user/photo/'+photoName;
        }
    }
    updateProfilePhoto(file:FormData){
        return this.http.post(this.apiAdress+'/user/photo/'+this.userData.userid,file,
        { observe: 'response' ,withCredentials:true})
        .pipe(tap((res:any)=>{
            this.userData.photo = res.body.name;
            this.userChange.next(this.userData);
        }))
    }
    getInvitations(){
        return this.http.get<User[]>(this.apiAdress+'/friend/invitation',
        {
            params: new HttpParams().set('userid',this.userData.userid),
            withCredentials:true
        }) 
        .pipe(tap(res=>{
            this.invitations=res;
            this.invChange.next(res);
        }))
    }
    inviteFriend(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id);
        return this.http.post(this.apiAdress+'/friend/invitation',{},{params,withCredentials:true});
    }

    acceptInvitation(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id);

        return this.http.patch(this.apiAdress+'/friend/invitation/confirm',{},{params,withCredentials:true});
    }
    rejectInvitation(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id); 

        return this.http.patch(this.apiAdress+'/friend/invitation/reject',{},{params,withCredentials:true});
    }
    deleteFriend(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id);
        return this.http.delete(this.apiAdress+'/friend',{params,withCredentials:true})
        .pipe(
            tap(()=>this.getFriends().subscribe(list=>{this.listChange.next(list);})));
    }

    searchUsers(text:string){
        return this.http.get(this.apiAdress+'/user/search/name/'+text, { withCredentials: true })
        .pipe(
            map((result:any)=>{
                let array: User[] = [];
                result.forEach((user:User) => {
                    if(user.userid!=this.userData.userid) array.push(user);
                });
                return array;
            }))
    }
    isUserYourFriend(id:string){
        const params = new HttpParams()
        .set('userid',this.userData.userid)
        .set('friendid',id);
        return this.http.get(this.apiAdress+'/friend/isFriend',{params,withCredentials:true});
    }
    setConversation(id:string){
        return this.http.get(this.apiAdress+'/conversation/user/'+this.userData.userid+"/"+id, { withCredentials: true })
        .pipe(
            map((array:any)=>{
                    const conversationid:string = array.conversationId;
                    const name:string = array.name;
                    const createdAt:Date = array.createdAt;
                    const type:ChatTypeEnum = array.conversationType;
                    const participants:User[] = array.participants;
                    const photo:string = array.photo;

                return {conversationid,name,createdAt,type,participants,photo};
            }),
            tap(res=>{
                this.cService.setConversation(res);
            })
        );
    }
    addInvitation(data:any){
        //this.invitations
    }

}