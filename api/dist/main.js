"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const core_2 = require("@mikro-orm/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const config_1 = require("./shared/configs/config");
const user_entity_1 = require("./user/user.entity");
const movie_entity_1 = require("./movie/movie.entity");
const movie_session_entity_1 = require("./movie-session/movie-session.entity");
async function bootstrap() {
    const orm = await core_2.MikroORM.init({
        entities: [user_entity_1.User, movie_entity_1.Movie, movie_session_entity_1.MovieSession],
        dbName: process.env.DB_NAME,
        type: 'postgresql',
    });
    await orm.getMigrator().up();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser(config_1.config.get('cookie.secret')));
    app.enableCors({
        origin: config_1.config.get('websiteUrl'),
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map