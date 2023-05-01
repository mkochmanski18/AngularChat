import { Conversation } from "src/conversation/conversation.entity";
import { MessageTypeEnum } from "src/utils/types";
import { BaseEntity } from "typeorm";
import { User } from "../user/user.entity";
export declare class Message extends BaseEntity {
    messageId: string;
    date: string;
    datetime: Date;
    content: string;
    messageType: MessageTypeEnum;
    sender: User;
    conversation: Conversation;
}
