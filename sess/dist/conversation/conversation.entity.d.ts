import { Message } from "src/message/message.entity";
import { ConversationTypeEnum } from "src/utils/types";
import { BaseEntity } from "typeorm";
import { User } from "../user/user.entity";
export declare class Conversation extends BaseEntity {
    conversationId: string;
    creator: User;
    name: string;
    conversationType: ConversationTypeEnum;
    messages: Message[];
    createdAt: Date;
    photo: string;
    participants: User[];
}
