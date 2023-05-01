"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const out_1 = require("connect-typeorm/out");
const session_entity_1 = require("./auth/session.entity");
const typeorm_1 = require("typeorm");
const gataway_adapter_1 = require("./gateway/gataway.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sessionRepository = (0, typeorm_1.getRepository)(session_entity_1.Session);
    const adapter = new gataway_adapter_1.WebSocketAdapter(app);
    app.useWebSocketAdapter(adapter);
    app.use(cookieParser());
    app.enableCors({ origin: ['http://localhost:3000', 'http://localhost:4200'], credentials: true });
    app.use(session({
        name: "CHAT_SESSION_ID",
        secret: "asdhjhk234",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            sameSite: false,
            httpOnly: false
        },
        store: new out_1.TypeormStore().connect(sessionRepository),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chat API')
        .setDescription('description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map