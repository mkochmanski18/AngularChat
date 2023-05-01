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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const register_dto_1 = require("./dto/register.dto");
const user_service_1 = require("./user.service");
const interfaces_1 = require("../utils/interfaces");
const types_1 = require("../utils/types");
const swagger_1 = require("@nestjs/swagger");
const Guards_1 = require("../auth/Guards");
const pwdChange_dto_1 = require("./dto/pwdChange.dto");
const Guards_2 = require("../auth/Guards");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const editFileName_1 = require("../utils/editFileName");
const UserdataUpdate_dto_1 = require("./dto/UserdataUpdate.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(newUser) {
        return this.userService.register(newUser);
    }
    deleteAccount(userid) {
        return this.userService.deleteAccount(userid);
    }
    confirm(userid) {
        return this.userService.confirmAccount(userid);
    }
    changePassword(data) {
        return this.userService.changePassword(data);
    }
    resetPasswordRequest(email) {
        return this.userService.resetPasswordRequest(email);
    }
    resetPassword(password, token) {
        return this.userService.resetPassword(password, token);
    }
    searchUserById(userid) {
        return this.userService.searchUserById(userid);
    }
    searchUserByName(name) {
        return this.userService.searchUserByName(name);
    }
    searchUserByEmail(email) {
        return this.userService.searchUserByEmail(email);
    }
    changeUsername(newname, userid) {
        return this.userService.changeUsername(userid, newname);
    }
    changeUserEmail(newemail, userid) {
        return this.userService.changeUserEmail(userid, newemail);
    }
    changeUserSex(newsex, userid) {
        return this.userService.changeUserSex(userid, newsex);
    }
    changeUserdata(userid, data) {
        return this.userService.changeUserdata(userid, data);
    }
    changeUserRole(newrole, userid) {
        return this.userService.changeUserRole(userid, newrole);
    }
    uploadFile(file, userid) {
        return this.userService.uploadPhoto(file, userid);
    }
    getPhoto(photo, res) {
        return res.sendFile(photo, { root: './assets/user-profile-images' });
    }
};
__decorate([
    (0, common_1.Post)('/registration'),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfuly.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User already exists' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User name is taken' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'User account deletion' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User account deleted successfuly.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exists" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)('/confirmation/:userid'),
    (0, swagger_1.ApiOperation)({ summary: 'User account confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User account confirmed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirm", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Patch)('/password'),
    (0, swagger_1.ApiOperation)({ summary: 'User password changing' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User account password changed' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Incorrect Password' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pwdChange_dto_1.pwdChangeDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/reset/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Request of reset User password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Request sended' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User does not exist' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordRequest", null);
__decorate([
    (0, common_1.Patch)('/reset'),
    (0, swagger_1.ApiOperation)({ summary: 'User password reset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User account password changed' }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Password is reapeted!' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Link is incorrect!' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('pwd')),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('search/id/:userid'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a user with certain userID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUserById", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('search/name/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a user with certain name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUserByName", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('search/email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a user with certain email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUserByEmail", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Patch)('name'),
    (0, swagger_1.ApiOperation)({ summary: 'Change username' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Username already used!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('newname')),
    __param(1, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUsername", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Patch)('email'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "User email already used!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('newemail')),
    __param(1, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserEmail", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Patch)('sex'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user sex' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('newsex')),
    __param(1, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserSex", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_2.RolesGuard),
    (0, common_1.Patch)('fulldata'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user role' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Name/Email is taken!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('userid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserdataUpdate_dto_1.UserdataUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserdata", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_2.RolesGuard),
    (0, common_1.Patch)('role'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user role' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User data changed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('newrole')),
    __param(1, (0, common_1.Query)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserRole", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard, Guards_1.UserIdentityGuard),
    (0, common_1.Post)('photo/:userid'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Photo has been uploaded' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'base64',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload user photo' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './assets/user-profile-images',
            filename: editFileName_1.editFileName,
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)("userid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('photo/:photoname'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Photo has been uploaded' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Photo doesn't exist!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('photoname')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPhoto", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __param(0, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map