/// <reference types="multer" />
import { HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { userData, IToken } from 'src/utils/interfaces';
import { TokenTypeEnum, UserRoleEnum } from "src/utils/types";
import { pwdChangeDto } from './dto/pwdChange.dto';
export declare class UserService {
    regFilter(user: User): userData;
    userDataFilter(user: User): userData;
    transporter: any;
    validateToken(token: string): IToken;
    createToken(tokenId: string, user: userData, type: TokenTypeEnum): string;
    register(newUser: RegisterDto): Promise<HttpException | userData>;
    deleteAccount(userid: any): Promise<HttpException>;
    confirmAccount(userid: string): Promise<HttpException>;
    changePassword(data: pwdChangeDto): Promise<HttpException>;
    resetPasswordRequest(email: string): Promise<HttpException>;
    resetPassword(password: string, token: string): Promise<HttpException>;
    getUsers(): Promise<User[]>;
    searchUserById(userid: string): Promise<HttpException | userData>;
    searchUserByName(name: string): Promise<HttpException | userData[]>;
    searchUserByEmail(email: string): Promise<HttpException | userData>;
    changeUsername(userid: string, newname: string): Promise<HttpException>;
    changeUserEmail(userid: string, newemail: string): Promise<HttpException>;
    changeUserSex(userid: string, newsex: string): Promise<HttpException>;
    changeUserdata(userid: string, data: {
        username: string;
        email: string;
        firstname: string;
        lastname: string;
        gender: string;
    }): Promise<HttpException>;
    changeUserRole(userid: string, newrole: UserRoleEnum): Promise<HttpException>;
    uploadPhoto(file: Express.Multer.File, id: any): Promise<void>;
}
