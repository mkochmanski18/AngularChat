import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChatControlPanelComponent } from './chat/chat-control-panel/chat-control-panel.component';
import { ChatPanelComponent } from './chat/chat-panel/chat-panel.component';
import { ChatListComponent } from './chat/chat-control-panel/chat-list/chat-list.component';
import { UserListItemComponent } from './chat/chat-control-panel/user-list-item/user-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './chat/settings/settings.component';
import { UserdataFormComponent } from './chat/settings/userdata-form/userdata-form.component';
import { FriendsManagerComponent } from './chat/settings/friends-manager/friends-manager.component';
import { GroupManagerComponent } from './chat/settings/group-manager/group-manager.component';
import { HttpClientModule} from '@angular/common/http';
import { UserItemComponent } from './chat/shared/components/user-item/user-item.component';
import { GroupItemComponent } from './chat/shared/components/group-item/group-item.component';
import { NewGroupComponent } from './chat/settings/group-manager/new-group/new-group.component';
import { UserProfileComponent } from './chat/profiles/user-profile/user-profile.component';
import { ProfilesComponent } from './chat/profiles/profiles.component';
import { GroupProfileComponent } from './chat/profiles/group-profile/group-profile.component';
import { MessageBlockComponent } from './chat/shared/components/message-block/message-block.component';
import { AutosizeModule } from 'ngx-autosize';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TypingInterfaceComponent } from './chat/shared/components/typing-interface/typing-interface.component';
import { UserOutPipe } from './chat/shared/pipes/user-out.pipe';
import { DatePipe } from './chat/shared/pipes/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegistrationComponent,
    ChatControlPanelComponent,
    ChatPanelComponent,
    ChatListComponent,
    UserListItemComponent,
    SettingsComponent,
    UserdataFormComponent,
    FriendsManagerComponent,
    GroupManagerComponent,
    UserItemComponent,
    GroupItemComponent,
    NewGroupComponent,
    UserProfileComponent,
    ProfilesComponent,
    GroupProfileComponent,
    MessageBlockComponent,
    TypingInterfaceComponent,
    UserOutPipe,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    AutosizeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
