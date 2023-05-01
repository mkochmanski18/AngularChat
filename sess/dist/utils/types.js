"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipType = exports.MessagesQueryTypeEnum = exports.ConfirmationStatusEnum = exports.MessageTypeEnum = exports.ConversationTypeEnum = exports.UserRoleEnum = exports.TokenTypeEnum = void 0;
var TokenTypeEnum;
(function (TokenTypeEnum) {
    TokenTypeEnum[TokenTypeEnum["CONFIRMATION"] = 0] = "CONFIRMATION";
    TokenTypeEnum[TokenTypeEnum["RESET"] = 1] = "RESET";
})(TokenTypeEnum = exports.TokenTypeEnum || (exports.TokenTypeEnum = {}));
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum[UserRoleEnum["REGULAR"] = 0] = "REGULAR";
    UserRoleEnum[UserRoleEnum["ADMIN"] = 1] = "ADMIN";
})(UserRoleEnum = exports.UserRoleEnum || (exports.UserRoleEnum = {}));
var ConversationTypeEnum;
(function (ConversationTypeEnum) {
    ConversationTypeEnum[ConversationTypeEnum["REGULAR"] = 0] = "REGULAR";
    ConversationTypeEnum[ConversationTypeEnum["GROUP"] = 1] = "GROUP";
})(ConversationTypeEnum = exports.ConversationTypeEnum || (exports.ConversationTypeEnum = {}));
var MessageTypeEnum;
(function (MessageTypeEnum) {
    MessageTypeEnum[MessageTypeEnum["TEXT"] = 0] = "TEXT";
    MessageTypeEnum[MessageTypeEnum["IMAGE"] = 1] = "IMAGE";
})(MessageTypeEnum = exports.MessageTypeEnum || (exports.MessageTypeEnum = {}));
var ConfirmationStatusEnum;
(function (ConfirmationStatusEnum) {
    ConfirmationStatusEnum[ConfirmationStatusEnum["FOREIGN"] = 0] = "FOREIGN";
    ConfirmationStatusEnum[ConfirmationStatusEnum["REMAINING"] = 1] = "REMAINING";
    ConfirmationStatusEnum[ConfirmationStatusEnum["CONFIRMED"] = 2] = "CONFIRMED";
    ConfirmationStatusEnum[ConfirmationStatusEnum["REJECTED"] = 3] = "REJECTED";
})(ConfirmationStatusEnum = exports.ConfirmationStatusEnum || (exports.ConfirmationStatusEnum = {}));
var MessagesQueryTypeEnum;
(function (MessagesQueryTypeEnum) {
    MessagesQueryTypeEnum[MessagesQueryTypeEnum["DAY"] = 0] = "DAY";
    MessagesQueryTypeEnum[MessagesQueryTypeEnum["MONTH"] = 1] = "MONTH";
    MessagesQueryTypeEnum[MessagesQueryTypeEnum["YEAR"] = 2] = "YEAR";
})(MessagesQueryTypeEnum = exports.MessagesQueryTypeEnum || (exports.MessagesQueryTypeEnum = {}));
var RelationshipType;
(function (RelationshipType) {
    RelationshipType[RelationshipType["FOREIGN"] = 0] = "FOREIGN";
    RelationshipType[RelationshipType["INVITED"] = 1] = "INVITED";
    RelationshipType[RelationshipType["FRIEND"] = 2] = "FRIEND";
    RelationshipType[RelationshipType["REJECTED"] = 3] = "REJECTED";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
//# sourceMappingURL=types.js.map