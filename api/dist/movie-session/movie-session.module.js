"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSessionModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const movie_session_service_1 = require("./movie-session.service");
const movie_session_controller_1 = require("./movie-session.controller");
const movie_session_entity_1 = require("./movie-session.entity");
const movie_module_1 = require("../movie/movie.module");
let MovieSessionModule = class MovieSessionModule {
};
exports.MovieSessionModule = MovieSessionModule;
exports.MovieSessionModule = MovieSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature({ entities: [movie_session_entity_1.MovieSession] }),
            movie_module_1.MovieModule,
        ],
        controllers: [movie_session_controller_1.MovieSessionController],
        providers: [movie_session_service_1.MovieSessionService],
    })
], MovieSessionModule);
//# sourceMappingURL=movie-session.module.js.map