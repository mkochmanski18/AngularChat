import { Pipe, PipeTransform } from "@angular/core";
import { ChatTypeEnum } from "../interfaces/chat.interface";
import { User } from "../interfaces/user.interface";

@Pipe({
    name:'userOut'
})
export class UserOutPipe implements PipeTransform{

    transform(value: any, userid:string,chatType:ChatTypeEnum) {
        //regular conversation
        if(chatType===ChatTypeEnum.REGULAR){
            for(const user of value){
                if(user.userid!==userid) return user;
            }
        }
    }
}