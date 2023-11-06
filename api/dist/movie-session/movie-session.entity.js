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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSession = void 0;
const core_1 = require("@mikro-orm/core");
const movie_entity_1 = require("../movie/movie.entity");
const create_movie_session_dto_1 = require("./dto/create-movie-session.dto");
let MovieSession = class MovieSession {
    constructor(dto) {
        this.date = dto.date;
        this.theatreName = dto.theatreName;
        this.theatreAddress = dto.theatreAddress;
        this.theatreCity = dto.theatreCity;
    }
};
exports.MovieSession = MovieSession;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], MovieSession.prototype, "sessionId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], MovieSession.prototype, "date", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], MovieSession.prototype, "theatreName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], MovieSession.prototype, "theatreAddress", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], MovieSession.prototype, "theatreCity", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => movie_entity_1.Movie),
    __metadata("design:type", movie_entity_1.Movie)
], MovieSession.prototype, "movie", void 0);
exports.MovieSession = MovieSession = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_movie_session_dto_1.CreateMovieSessionDto])
], MovieSession);
//# sourceMappingURL=movie-session.entity.js.map