import { User } from "./user.interface";

export interface Chat{
    conversationid: string,
    name: string,
    createdAt: Date,
    participants: User[],
    type: ChatTypeEnum,
    photo: string
} 

export enum ChatTypeEnum{
    REGULAR,
    GROUP
}