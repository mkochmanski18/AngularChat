/// <reference types="multer" />
import { HttpException } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MessageService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sendTextMessage(data: MessageDto): Promise<HttpException>;
    sendImageMessage(userid: string, conversationid: string, file: Express.Multer.File): Promise<HttpException>;
    getMessages(userid: string): Promise<HttpException | MessageDto[]>;
    getImageMessage(messageId: string, res: any): Promise<HttpException | MessageDto[]>;
}
