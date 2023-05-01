"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const hash_pwd_1 = require("../utils/hash-pwd");
const user_entity_1 = require("./user.entity");
const interfaces_1 = require("../utils/interfaces");
const types_1 = require("../utils/types");
const jwt = require("jsonwebtoken");
const config_1 = require("../utils/config");
const token_entity_1 = require("./token.entity");
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
"use strict";
const nodemailer = require("nodemailer");
let UserService = class UserService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "outlook.office365.com",
            port: 587,
            auth: {
                user: 'mkoch18@outlook.com',
                pass: 'Fp#VHNetLb9Za'
            }
        });
    }
    regFilter(user) {
        const { userid, name, firstname, lastname, sex, email, role } = user;
        return { userid, name, firstname, lastname, sex, email, role };
    }
    userDataFilter(user) {
        const { userid, name, firstname, lastname, email, sex, role } = user;
        return { userid, name, firstname, lastname, email, sex, role };
    }
    validateToken(token) {
        return jwt.verify(token, 'WSfSfqjVKA495z5qJ9');
    }
    createToken(tokenId, user, type) {
        const payload = {
            tokenId,
            email: user.email,
            id: user.userid,
            role: user.role,
            type,
        };
        const expiresIn = 60 * 60 * 24;
        return jwt.sign(payload, 'WSfSfqjVKA495z5qJ9', { expiresIn });
    }
    async register(newUser) {
        const checkemail = await user_entity_1.User.findOne({
            email: newUser.email,
        });
        const checkname = await user_entity_1.User.findOne({
            name: newUser.name,
        });
        if (checkemail) {
            throw new common_1.HttpException("User already exists!", common_1.HttpStatus.BAD_REQUEST);
        }
        else if (checkname) {
            throw new common_1.HttpException("User name is taken!", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const user = new user_entity_1.User();
            user.name = newUser.name;
            user.email = newUser.email;
            user.firstname = newUser.firstname;
            user.lastname = newUser.lastname;
            user.sex = newUser.sex;
            user.role = types_1.UserRoleEnum.REGULAR;
            user.pwdHash = (0, hash_pwd_1.hashPwd)(newUser.pwd);
            user.createdAt = new Date();
            await user.save();
            console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] Created!");
            let message = "Hello " + user.name + " " + user.firstname + "!\n This email has been generated automaticaly. Don't answer this message.\n" +
                "It contains account confirmation link. If you got this mail by accident, just ignore this mail.\n " +
                "If you're expecting this email, just click in link below.\n" + config_1.address + ":" + 5000 + "/user/confirmation/" + user.userid;
            let htmlmessage = "<div style='text-align:center'><h5>Hello " + user.firstname + "!</h5><p>This email has been generated automaticaly. Don't answer this message.</p>" +
                "<p>It contains account confirmation link. If you got this mail by accident, just ignore this mail.</p>" +
                "<p>If you're expecting this email, just click in link below.</p>" +
                "<p>" + config_1.address + ":" + 5000 + "/user/confirmation/" + user.userid + "</p></div>";
            console.log(message);
            return user;
        }
    }
    async deleteAccount(userid) {
        const user = await user_entity_1.User.findOne({ userid: userid });
        if (!user)
            throw new common_1.HttpException({ message: "User doesn't exists" }, common_1.HttpStatus.NOT_FOUND);
        token_entity_1.Token.delete({ owner: user });
        user_entity_1.User.delete({ userid: userid });
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] has been deleted!");
        throw new common_1.HttpException({ message: "User deleted" }, common_1.HttpStatus.OK);
    }
    async confirmAccount(userid) {
        const user = await user_entity_1.User.findOne({ userid: userid });
        console.log(userid);
        if (!user) {
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        user.confirmed = true;
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "]'s email has been confrimed!");
        throw new common_1.HttpException("User's account has been confirmed", common_1.HttpStatus.OK);
    }
    async changePassword(data) {
        const user = await user_entity_1.User.findOne({
            userid: data.id
        });
        if (!user) {
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        if ((0, hash_pwd_1.hashPwd)(data.oldPassword) != user.pwdHash)
            throw new common_1.HttpException("Incorrect Password", common_1.HttpStatus.FORBIDDEN);
        user.pwdHash = (0, hash_pwd_1.hashPwd)(data.newPassword);
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] changed password!");
        throw new common_1.HttpException("Password Changed", common_1.HttpStatus.OK);
    }
    async resetPasswordRequest(email) {
        const user = await user_entity_1.User.findOne({
            email: email
        });
        if (!user) {
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        }
        let tokenId;
        let userWithThisToken = null;
        do {
            tokenId = (0, uuid_1.v4)();
            userWithThisToken = await token_entity_1.Token.findOne({ resetTokenId: tokenId });
        } while (!!userWithThisToken);
        const token = this.createToken(tokenId, user, types_1.TokenTypeEnum.RESET);
        const tokenList = await token_entity_1.Token.findOne({ owner: user });
        tokenList.resetTokenId = tokenId;
        tokenList.owner = user;
        await tokenList.save();
        await user.save();
        let message = "Hello " + user.firstname + "!\n This email has been generated automaticaly. Don't answer this message. \nIt contains reset password link. If you got this mail by accident, just ignore this mail.\nIf you're expecting this email, just click in link below, to reset your account password.\n" + config_1.address + ":" + config_1.port + "/user/reset/" + token;
        let htmlmessage = "<div style='text-align:center'><h5>Hello " + user.firstname + "!</h5><p>This email has been generated automaticaly. Don't answer this message.</p>" +
            "<p>It contains reset password link. If you got this mail by accident, just ignore this mail.</p>" +
            "<p>If you're expecting this email, just click in link below, to reset your account password</p>" +
            "<p>" + config_1.address + ":" + config_1.port + "/user/reset/" + token + "</p></div>";
        console.log(message);
        console.log(htmlmessage);
        throw new common_1.HttpException({ message: "Reset Password Link Sended" }, common_1.HttpStatus.OK);
    }
    async resetPassword(password, token) {
        var payload;
        try {
            payload = this.validateToken(token);
        }
        catch (_a) {
            throw new common_1.HttpException("Link is incorrect!", common_1.HttpStatus.FORBIDDEN);
        }
        console.log(token);
        const checktoken = await token_entity_1.Token.findOne({ resetTokenId: payload.tokenId });
        if (!checktoken)
            throw new common_1.HttpException("Link is incorrect!", common_1.HttpStatus.FORBIDDEN);
        const user = await user_entity_1.User.findOne({ email: payload.email });
        const newPwdHash = (0, hash_pwd_1.hashPwd)(password);
        if (newPwdHash == user.pwdHash)
            throw new common_1.HttpException("Password is reapeted!", common_1.HttpStatus.NOT_ACCEPTABLE);
        user.pwdHash = newPwdHash;
        user.save();
        checktoken.resetTokenId = null;
        checktoken.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] changed password!");
        throw new common_1.HttpException("User account password has been changed", common_1.HttpStatus.OK);
    }
    getUsers() {
        const users = user_entity_1.User.find();
        return users;
    }
    async searchUserById(userid) {
        const searchedUser = await (0, typeorm_1.getRepository)(user_entity_1.User)
            .createQueryBuilder("user")
            .select("user.userid,user.name,user.firstname,user.lastname,user.sex,user.email,user.photo")
            .where("userid=:userid", { userid })
            .getRawOne();
        if (!searchedUser)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        return searchedUser;
    }
    async searchUserByName(name) {
        const searchedUser = user_entity_1.User.query("SELECT * FROM `user` WHERE name like ? or firstname like ? or lastname like ?", [`%${name}%`, `%${name}%`, `%${name}%`]);
        if (!searchedUser)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        return searchedUser;
    }
    async searchUserByEmail(email) {
        const searchedUser = await (0, typeorm_1.getRepository)(user_entity_1.User)
            .createQueryBuilder("user")
            .select("user.userid,user.name,user.firstname,user.lastname,user.sex,user.email,user.photo")
            .where("email=:email", { email })
            .getRawOne();
        if (!searchedUser)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        return searchedUser;
    }
    async changeUsername(userid, newname) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        const checkname = await user_entity_1.User.findOne({ name: newname });
        if (!checkname || checkname != user)
            throw new common_1.HttpException("Username is already in use!", common_1.HttpStatus.BAD_REQUEST);
        const oldname = user.name;
        user.name = newname;
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + oldname + "[" + user.email + "] changed name to " + newname + "!");
        throw new common_1.HttpException("User data changed", common_1.HttpStatus.OK);
    }
    async changeUserEmail(userid, newemail) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        const checkemail = await user_entity_1.User.findOne({ email: newemail });
        if (!checkemail || checkemail != user)
            throw new common_1.HttpException("Email is already in use!", common_1.HttpStatus.BAD_REQUEST);
        const oldemail = user.email;
        user.email = newemail;
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + oldemail + "] changed email to " + newemail + "!");
        throw new common_1.HttpException("User data changed", common_1.HttpStatus.OK);
    }
    async changeUserSex(userid, newsex) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        user.sex = newsex;
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] changed sex to " + newsex + "!");
        throw new common_1.HttpException("User data changed", common_1.HttpStatus.OK);
    }
    async changeUserdata(userid, data) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        const { username, email, firstname, lastname, gender } = data;
        const isEmailTaken = await user_entity_1.User.findOne({ email });
        if (isEmailTaken && isEmailTaken.userid !== user.userid) {
            throw new common_1.HttpException("Someone is using email already!", common_1.HttpStatus.BAD_REQUEST);
        }
        const isNameTaken = await user_entity_1.User.findOne({ name: username });
        if (isNameTaken && isNameTaken.userid !== user.userid) {
            throw new common_1.HttpException("Someone is using name already!", common_1.HttpStatus.BAD_REQUEST);
        }
        user.name = username;
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.sex = gender;
        user.save();
        throw new common_1.HttpException("User data updated!", common_1.HttpStatus.OK);
    }
    async changeUserRole(userid, newrole) {
        const user = await user_entity_1.User.findOne({ userid });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        user.role = newrole;
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] changed name to " + newrole + "!");
        throw new common_1.HttpException("User data changed", common_1.HttpStatus.OK);
    }
    async uploadPhoto(file, id) {
        console.log(id);
        const user = await user_entity_1.User.findOne({ userid: id });
        if (!user)
            throw new common_1.HttpException("User doesn't exist!", common_1.HttpStatus.NOT_FOUND);
        user.photo = file.filename;
        console.log(file.filename);
        user.save();
        console.log("[CHAT][INFO] " + new Date().toUTCString() + " - User: " + user.name + "[" + user.email + "] uploaded photo:" + file.filename + "!");
        throw new common_1.HttpException({ message: "Photo has been uploaded", name: file.filename }, common_1.HttpStatus.CREATED);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map