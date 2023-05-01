/// <reference types="multer" />
import { HttpException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { userData } from 'src/utils/interfaces';
import { UserRoleEnum } from "src/utils/types";
import { pwdChangeDto } from './dto/pwdChange.dto';
import { UserdataUpdateDto } from './dto/UserdataUpdate.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(newUser: RegisterDto): Promise<HttpException | userData>;
    deleteAccount(userid: string): Promise<HttpException>;
    confirm(userid: string): Promise<HttpException>;
    changePassword(data: pwdChangeDto): Promise<HttpException>;
    resetPasswordRequest(email: string): Promise<HttpException>;
    resetPassword(password: string, token: string): Promise<HttpException>;
    searchUserById(userid: string): Promise<HttpException | userData>;
    searchUserByName(name: string): Promise<HttpException | userData[]>;
    searchUserByEmail(email: string): Promise<HttpException | userData>;
    changeUsername(newname: string, userid: string): Promise<HttpException>;
    changeUserEmail(newemail: string, userid: string): Promise<HttpException>;
    changeUserSex(newsex: string, userid: string): Promise<HttpException>;
    changeUserdata(userid: string, data: UserdataUpdateDto): Promise<HttpException>;
    changeUserRole(newrole: UserRoleEnum, userid: string): Promise<HttpException>;
    uploadFile(file: Express.Multer.File, userid: string): Promise<void>;
    getPhoto(photo: string, res: any): any;
}
