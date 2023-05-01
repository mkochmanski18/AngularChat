import { HttpException } from '@nestjs/common';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { Conversation } from './conversation.entity';
import { ConversationService } from './conversation.service';
import { ConversationDto, ConversationWithPDto } from './dto/conversation.dto';
export declare class ConversationController {
    private conversationService;
    constructor(conversationService: ConversationService);
    getUserConversations(userid: string): Promise<HttpException | User[] | Conversation[]>;
    getConversationByUID(uid: string, fid: string): Promise<any>;
    getConversation(conversationid: string): Promise<HttpException | Conversation>;
    getMessages(conversationid: string): Promise<HttpException | Message[]>;
    getParticipants(conversationid: string): Promise<HttpException | Conversation>;
    createConversation(body: ConversationDto): Promise<HttpException | Conversation>;
    createConversationWithParticipants(body: ConversationWithPDto): Promise<HttpException | Conversation>;
    deleteConversation(conversationid: string): Promise<HttpException>;
    changeName(conversationid: string, newname: string): Promise<HttpException>;
    addParticipant(conversationid: string, participantid: string): Promise<HttpException>;
    changeOwner(conversationid: string, userid: string): Promise<HttpException>;
    deleteParticipant(conversationid: string, participantid: string): Promise<HttpException>;
}
