"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPwd = void 0;
const crypto = require("crypto");
const hashPwd = (p) => {
    const hmac = crypto.createHmac('sha512', 'asdfghqweuti123#@#lkkltjrejkhuy535&#345jnhhj');
    hmac.update(p);
    return hmac.digest('hex');
};
exports.hashPwd = hashPwd;
//# sourceMappingURL=hash-pwd.js.map