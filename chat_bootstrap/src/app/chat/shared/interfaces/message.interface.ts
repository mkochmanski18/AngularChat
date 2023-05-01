import { Chat } from "./chat.interface";
import { User } from "./user.interface";

export interface Message{
    id: string,
    date: string,
    datetime: Date,
    content: string,
    author: User,
    type:MessageTypeEnum,
    conversation: Chat
}

export enum MessageTypeEnum{
    TEXT,
    IMAGE
}