"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const conversation_entity_1 = require("../conversation/conversation.entity");
const types_1 = require("../utils/types");
let MessageService = class MessageService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async sendTextMessage(data) {
        const user = await user_entity_1.User.findOne({ userid: data.senderId });
        if (!user)
            throw new common_1.HttpException("Sender User id is incorrect", common_1.HttpStatus.BAD_REQUEST);
        const conversation = await conversation_entity_1.Conversation.findOne({ conversationId: data.conversationId });
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        let message = new message_entity_1.Message;
        message.date = new Date(data.datetime).toDateString().split('-14')[0];
        message.datetime = new Date(data.datetime);
        message.sender = user;
        message.content = data.text;
        message.conversation = conversation;
        message.messageType = types_1.MessageTypeEnum.TEXT;
        await message.save().then(() => {
            const { messageId, date, datetime, content, messageType, sender } = message;
            const { userid, name, firstname, lastname, email, photo } = sender;
            let senderData = ({ userid, name, firstname, lastname, email, photo });
            const newMessages = { messageId, date, datetime, content, messageType, senderData, conversation };
            this.eventEmitter.emit('message.create', newMessages);
            console.log(newMessages);
        });
        throw new common_1.HttpException({ msg: "Message sended", data }, common_1.HttpStatus.CREATED);
    }
    async sendImageMessage(userid, conversationid, file) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("Sender User id is incorrect", common_1.HttpStatus.BAD_REQUEST);
        const conversation = await conversation_entity_1.Conversation.findOne({ conversationId: conversationid });
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        let message = new message_entity_1.Message;
        const data = new Date();
        message.date = data.toDateString().split('-14')[0];
        message.datetime = data;
        message.sender = user;
        message.conversation = conversation;
        message.content = file.filename;
        message.messageType = types_1.MessageTypeEnum.IMAGE;
        message.save();
        this.eventEmitter.emit('message.create', message);
        throw new common_1.HttpException({ msg: "Message sended", data }, common_1.HttpStatus.CREATED);
    }
    async getMessages(userid) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("Sender User ID is incorrect", common_1.HttpStatus.BAD_REQUEST);
        const messages = await (0, typeorm_1.getRepository)(message_entity_1.Message)
            .createQueryBuilder("message")
            .select("messageid,datetime,senderUserid,conversationConversationId,content")
            .where("senderUserid=:uid", { uid: user.userid })
            .getRawMany();
        return messages;
    }
    async getImageMessage(messageId, res) {
        const message = await message_entity_1.Message.findOne({ messageId });
        if (!message)
            throw new common_1.HttpException("Message ID is incorrect", common_1.HttpStatus.BAD_REQUEST);
        return res.sendFile(message.content, { root: './assets/messages' });
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map