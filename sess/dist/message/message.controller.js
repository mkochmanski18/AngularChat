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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const swagger_1 = require("@nestjs/swagger");
const multer_2 = require("multer");
const Guards_1 = require("../auth/Guards");
const editFileName_1 = require("../utils/editFileName");
const message_dto_1 = require("./dto/message.dto");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    sendTextMessage(data) {
        return this.messageService.sendTextMessage(data);
    }
    sendImageMessage(file, userid, conversationid) {
        return this.messageService.sendImageMessage(userid, conversationid, file);
    }
    getMessages(userid) {
        console.log(userid);
        return this.messageService.getMessages(userid);
    }
    getImageMessage(userid, res) {
        console.log(userid);
        return this.messageService.getImageMessage(userid, res);
    }
};
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Post)('newText'),
    (0, swagger_1.ApiOperation)({ summary: 'Send text message to another user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sended.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Incorrect Username" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendTextMessage", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Post)('newImage'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Send message with image to another user' }),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('file', {
        storage: (0, multer_2.diskStorage)({
            destination: './assets/messages',
            filename: editFileName_1.editFileName,
        })
    })),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sended.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Incorrect Username" }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)("userid")),
    __param(2, (0, common_1.Query)("conversationid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendImageMessage", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Get)('text'),
    (0, swagger_1.ApiOperation)({ summary: 'Show sended messages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Incorrect User id" }),
    __param(0, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('image'),
    (0, swagger_1.ApiOperation)({ summary: 'Show sended messages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages downloaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Incorrect User id" }),
    __param(0, (0, common_1.Query)('messageid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getImageMessage", null);
MessageController = __decorate([
    (0, swagger_1.ApiTags)('message'),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map