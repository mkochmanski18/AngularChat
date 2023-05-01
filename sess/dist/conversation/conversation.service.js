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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
const types_1 = require("../utils/types");
const typeorm_1 = require("typeorm");
const conversation_entity_1 = require("./conversation.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const friend_service_1 = require("../friend/friend.service");
let ConversationService = class ConversationService {
    constructor(eventEmitter, friendService) {
        this.eventEmitter = eventEmitter;
        this.friendService = friendService;
    }
    async changeName(conversationid, newname) {
        const conversation = await conversation_entity_1.Conversation.findOne(conversationid);
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const oldname = conversation.name;
        conversation.name = newname;
        conversation.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - Conversation: " + oldname + " changed name to " + newname + "!");
        this.eventEmitter.emit('conversation.update', conversation);
        throw new common_1.HttpException("Conversation's name changed", common_1.HttpStatus.OK);
    }
    async changeOwner(conversationid, userid) {
        const conversation = await conversation_entity_1.Conversation.findOne(conversationid);
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const oldowner = conversation.creator;
        conversation.creator = user;
        conversation.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - Conversation: " + oldowner + " changed owner to " + userid + "!");
        this.eventEmitter.emit('conversation.update', conversation);
        throw new common_1.HttpException("Conversation's owner changed", common_1.HttpStatus.OK);
    }
    async deleteConversation(conversationid) {
        const conversation = await conversation_entity_1.Conversation.findOne(conversationid);
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't existt", common_1.HttpStatus.NOT_FOUND);
        if (conversation.conversationType = types_1.ConversationTypeEnum.REGULAR)
            throw new common_1.HttpException("Conversation can't be deleted!", common_1.HttpStatus.FORBIDDEN);
        conversation.participants = null;
        conversation.save();
        conversation_entity_1.Conversation.delete({ conversationId: conversationid });
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - Conversation: " + conversation.name + " has been deleted!");
        this.eventEmitter.emit('conversation.delete', conversation.conversationId);
        throw new common_1.HttpException("Conversation deleted", common_1.HttpStatus.OK);
    }
    async createConversation(body) {
        const owner = await user_entity_1.User.findOne({ userid: body.ownerID });
        if (!owner)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const conversation = new conversation_entity_1.Conversation();
        conversation.creator = owner;
        conversation.createdAt = new Date();
        conversation.name = body.name;
        conversation.conversationType = types_1.ConversationTypeEnum.GROUP;
        conversation.participants = [owner];
        await conversation.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - Conversation: name: " + conversation.name + " has been created!");
        const conversationObject = await (0, typeorm_1.getRepository)(conversation_entity_1.Conversation)
            .createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.participants", "conv")
            .where("conversation.name=:name", { name: conversation.name })
            .getOne();
        this.eventEmitter.emit('conversation.create', conversationObject);
        return conversation;
    }
    async createConversationWithParticipants(body) {
        const owner = await user_entity_1.User.findOne({ userid: body.ownerID });
        if (!owner)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const conversation = new conversation_entity_1.Conversation();
        conversation.creator = owner;
        conversation.createdAt = new Date();
        conversation.name = body.name;
        conversation.conversationType = types_1.ConversationTypeEnum.GROUP;
        let participantsArray = [owner];
        for (const id of body.participants) {
            const participant = await user_entity_1.User.findOne({ userid: id });
            if (!participant)
                throw new common_1.HttpException("Participant doesn't exist", common_1.HttpStatus.NOT_FOUND);
            participantsArray.push(participant);
        }
        conversation.participants = participantsArray;
        await conversation.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - Conversation: name: " + conversation.name + " has been created!");
        const conversationObject = await (0, typeorm_1.getRepository)(conversation_entity_1.Conversation)
            .createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.participants", "conv")
            .where("conversation.name=:name", { name: conversation.name })
            .getOne();
        this.eventEmitter.emit('conversation.create', conversationObject);
        return conversation;
    }
    async getUserConversations(userid) {
        const user = user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const query = await user_entity_1.User.createQueryBuilder("user")
            .leftJoinAndSelect("user.conversations", "conv")
            .leftJoinAndSelect("conv.participants", "participant")
            .where("user.userid=:id and conv.conversationType=1", { id: userid })
            .getOne();
        let newConversationsArray = [];
        if (query) {
            const { conversations } = query;
            conversations.map(conv => {
                const { conversationId, name, createdAt, conversationType, participants, creator } = conv;
                let newParticipantsArray = [];
                participants.map(participant => {
                    const { userid, name, firstname, lastname, email, photo } = participant;
                    newParticipantsArray.push({ userid, name, firstname, lastname, email, photo });
                });
                newConversationsArray.push({ conversationId, name, createdAt, conversationType, creator, participants: newParticipantsArray });
            });
        }
        return newConversationsArray;
    }
    async getConversationByUID(uid, fid) {
        const user = await user_entity_1.User.findOne({ userid: uid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const friend = await user_entity_1.User.findOne({ userid: fid });
        if (!friend)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const conv = await user_entity_1.User.createQueryBuilder("user")
            .leftJoinAndSelect("user.conversations", "conv")
            .leftJoinAndSelect("conv.participants", "participant")
            .where("user.userid=:id and conv.conversationType=0", { id: uid })
            .getOne();
        for (const el of conv.conversations) {
            let count = 0;
            if (el.participants[0].userid === uid || el.participants[0].userid === fid)
                count += 1;
            if (el.participants[1].userid === uid || el.participants[1].userid === fid)
                count += 1;
            if (count === 2)
                return el;
        }
        return null;
    }
    async getMessages(conversationid) {
        const conversation = await conversation_entity_1.Conversation.findOne({ conversationId: conversationid });
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const messages = await message_entity_1.Message.createQueryBuilder("message")
            .leftJoinAndSelect("message.sender", "sender")
            .leftJoinAndSelect("message.conversation", "conversation")
            .where("conversation.conversationId=:id", { id: conversation.conversationId })
            .orderBy("message.datetime", "ASC")
            .getMany();
        let newMessagesArray = [];
        messages.map(message => {
            const { messageId, date, datetime, content, messageType, sender, conversation } = message;
            const { userid, name, firstname, lastname, email, photo } = sender;
            let senderData = ({ userid, name, firstname, lastname, email, photo });
            newMessagesArray.push({ messageId, date, datetime, content, messageType, senderData, conversation });
        });
        return newMessagesArray;
    }
    async getParticipants(conversationid) {
        const result = await this.getConversation(conversationid);
        if (!result)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        return result;
    }
    async getConversation(conversationid) {
        const result = await (0, typeorm_1.getRepository)(conversation_entity_1.Conversation)
            .createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.participants", "conv")
            .where("conversationId=:id", { id: conversationid })
            .getOne();
        return result;
    }
    async addParticipant(conversationid, participantid) {
        const conversation = await this.getConversation(conversationid);
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const user = await user_entity_1.User.findOne({ userid: participantid });
        if (!user)
            throw new common_1.HttpException("Participant doesn't exist", common_1.HttpStatus.NOT_FOUND);
        conversation.participants.push(user);
        conversation.save();
        this.eventEmitter.emit('conversation.update', conversation);
        throw new common_1.HttpException("Participant has been added to conversation", common_1.HttpStatus.OK);
    }
    async deleteParticipant(conversationid, participantid) {
        const conversation = await conversation_entity_1.Conversation.findOne({ conversationId: conversationid });
        if (!conversation)
            throw new common_1.HttpException("Conversation doesn't exist", common_1.HttpStatus.NOT_FOUND);
        const user = await user_entity_1.User.findOne({ userid: participantid });
        if (!user)
            throw new common_1.HttpException("Participant doesn't exist", common_1.HttpStatus.NOT_FOUND);
        let newArray = [];
        conversation.participants.forEach(participant => {
            if (participant !== user)
                newArray.push(participant);
        });
        conversation.participants = newArray;
        conversation.save();
        this.eventEmitter.emit('conversation.update', conversation);
        throw new common_1.HttpException("Participant has been deleted from conversation", common_1.HttpStatus.OK);
    }
};
ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        friend_service_1.FriendService])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map