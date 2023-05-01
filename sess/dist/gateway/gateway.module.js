"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const conversation_module_1 = require("../conversation/conversation.module");
const friend_module_1 = require("../friend/friend.module");
const gateway_session_1 = require("./gateway.session");
const websocket_gateway_1 = require("./websocket.gateway");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            conversation_module_1.ConversationModule,
            friend_module_1.FriendModule
        ],
        providers: [
            websocket_gateway_1.MessageGateway,
            gateway_session_1.GatewaySessionManager,
        ],
        exports: [
            websocket_gateway_1.MessageGateway,
            gateway_session_1.GatewaySessionManager,
        ],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map