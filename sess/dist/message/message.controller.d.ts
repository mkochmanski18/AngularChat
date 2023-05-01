/// <reference types="multer" />
import { HttpException } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    sendTextMessage(data: MessageDto): Promise<HttpException>;
    sendImageMessage(file: Express.Multer.File, userid: string, conversationid: string): Promise<HttpException>;
    getMessages(userid: string): Promise<HttpException | MessageDto[]>;
    getImageMessage(userid: string, res: any): Promise<HttpException | MessageDto[]>;
}
