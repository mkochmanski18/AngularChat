import { Conversation } from "src/conversation/conversation.entity";
import { Friend } from "src/friend/friend.entity";
import { UserRoleEnum } from "src/utils/types";
import { Message } from "src/message/message.entity";
import { BaseEntity } from "typeorm";
import { Token } from "./token.entity";
export declare class User extends BaseEntity {
    userid: string;
    name: string;
    firstname: string;
    lastname: string;
    sex: string;
    email: string;
    confirmed: boolean;
    pwdHash: string;
    createdAt: Date;
    role: UserRoleEnum;
    photo: string;
    tokens: Token[];
    users: Friend[];
    friends: Friend[];
    sends: Message[];
    ownings: Conversation[];
    conversations: Conversation[];
}
