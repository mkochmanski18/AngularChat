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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Guards_1 = require("../auth/Guards");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
const conversation_service_1 = require("./conversation.service");
const conversation_dto_1 = require("./dto/conversation.dto");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    getUserConversations(userid) {
        return this.conversationService.getUserConversations(userid);
    }
    getConversationByUID(uid, fid) {
        return this.conversationService.getConversationByUID(uid, fid);
    }
    getConversation(conversationid) {
        return this.conversationService.getConversation(conversationid);
    }
    getMessages(conversationid) {
        return this.conversationService.getMessages(conversationid);
    }
    getParticipants(conversationid) {
        return this.conversationService.getParticipants(conversationid);
    }
    createConversation(body) {
        return this.conversationService.createConversation(body);
    }
    createConversationWithParticipants(body) {
        return this.conversationService.createConversationWithParticipants(body);
    }
    deleteConversation(conversationid) {
        return this.conversationService.deleteConversation(conversationid);
    }
    changeName(conversationid, newname) {
        return this.conversationService.changeName(conversationid, newname);
    }
    addParticipant(conversationid, participantid) {
        return this.conversationService.addParticipant(conversationid, participantid);
    }
    changeOwner(conversationid, userid) {
        return this.conversationService.changeOwner(conversationid, userid);
    }
    deleteParticipant(conversationid, participantid) {
        return this.conversationService.deleteParticipant(conversationid, participantid);
    }
};
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Get)('user/:userid'),
    (0, swagger_1.ApiOperation)({ summary: 'Show all informations about group conversations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getUserConversations", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('user/:uid/:fid'),
    (0, swagger_1.ApiOperation)({ summary: 'Show conversation by UID and FID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Param)('fid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationByUID", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)(':conversationid'),
    (0, swagger_1.ApiOperation)({ summary: 'Show all informations about conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('conversationid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversation", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('messages/:conversationid'),
    (0, swagger_1.ApiOperation)({ summary: 'Show messages in conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('conversationid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getMessages", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('participants/:conversationid'),
    (0, swagger_1.ApiOperation)({ summary: 'Show conversation participants ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participants downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('conversationid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getParticipants", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Post)('empty'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new Conversation without participants' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conversation created.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Participant doesn't exist" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversation_dto_1.ConversationDto]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "createConversation", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Post)('participants'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new Conversation with participants' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conversation created.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Participant doesn't exist" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversation_dto_1.ConversationWithPDto]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "createConversationWithParticipants", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.ConversationOwnerGuard),
    (0, common_1.Delete)(':conversationid'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation deleted' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Conversation can't be deleted!" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Param)('conversationid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "deleteConversation", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.ConversationOwnerGuard),
    (0, common_1.Patch)('name'),
    (0, swagger_1.ApiOperation)({ summary: 'Change Conversation name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation name changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation doesn't exist" }),
    __param(0, (0, common_1.Query)('conversationid')),
    __param(1, (0, common_1.Query)('newname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "changeName", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.ConversationOwnerGuard),
    (0, common_1.Patch)('participants'),
    (0, swagger_1.ApiOperation)({ summary: 'Add new Participant to conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant has been added' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation/Participant doesn't exist" }),
    __param(0, (0, common_1.Query)('conversationid')),
    __param(1, (0, common_1.Query)('participantid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "addParticipant", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.ConversationOwnerGuard),
    (0, common_1.Patch)('owner'),
    (0, swagger_1.ApiOperation)({ summary: 'Change conversations owner' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PArticipant has been added' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation/User doesn't exist" }),
    __param(0, (0, common_1.Query)('conversationid')),
    __param(1, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "changeOwner", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.ConversationOwnerGuard),
    (0, common_1.Delete)('participants'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete participant from Conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Participant deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Conversation/Participant doesn't exist" }),
    __param(0, (0, common_1.Query)('conversationid')),
    __param(1, (0, common_1.Query)('participantid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "deleteParticipant", null);
ConversationController = __decorate([
    (0, swagger_1.ApiTags)('conversation'),
    (0, common_1.Controller)('conversation'),
    __param(0, (0, common_1.Inject)(conversation_service_1.ConversationService)),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map