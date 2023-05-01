import { HttpException } from '@nestjs/common';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { Conversation } from './conversation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConversationDto, ConversationWithPDto } from './dto/conversation.dto';
import { FriendService } from 'src/friend/friend.service';
export declare class ConversationService {
    private eventEmitter;
    private friendService;
    constructor(eventEmitter: EventEmitter2, friendService: FriendService);
    changeName(conversationid: string, newname: string): Promise<HttpException>;
    changeOwner(conversationid: string, userid: string): Promise<HttpException>;
    deleteConversation(conversationid: string): Promise<HttpException>;
    createConversation(body: ConversationDto): Promise<HttpException | Conversation>;
    createConversationWithParticipants(body: ConversationWithPDto): Promise<HttpException | Conversation>;
    getUserConversations(userid: string): Promise<HttpException | User[] | Conversation[]>;
    getConversationByUID(uid: string, fid: string): Promise<any>;
    getMessages(conversationid: string): Promise<HttpException | Message[]>;
    getParticipants(conversationid: string): Promise<HttpException | Conversation>;
    getConversation(conversationid: string): Promise<Conversation>;
    addParticipant(conversationid: string, participantid: string): Promise<HttpException>;
    deleteParticipant(conversationid: string, participantid: string): Promise<HttpException>;
}
