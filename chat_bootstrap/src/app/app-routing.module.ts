import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FriendsManagerComponent } from './chat/settings/friends-manager/friends-manager.component';
import { GroupManagerComponent } from './chat/settings/group-manager/group-manager.component';
import { UserdataFormComponent } from './chat/settings/userdata-form/userdata-form.component';
import { UserProfileComponent } from './chat/profiles/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GroupProfileComponent } from './chat/profiles/group-profile/group-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'chat/:userid',component:ChatComponent,children:[
    // {path:'settings/friends',component:FriendsManagerComponent},
    // {path:'settings/groups',component:GroupManagerComponent},
    // {path:'settings/userdata',component:UserdataFormComponent},
    {path:'profile/user/:id',component:UserProfileComponent},
    {path:'profile/group/:id',component:GroupProfileComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
