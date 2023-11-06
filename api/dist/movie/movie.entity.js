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
exports.Movie = void 0;
const core_1 = require("@mikro-orm/core");
const movie_session_entity_1 = require("../movie-session/movie-session.entity");
const dto_1 = require("./dto");
let Movie = class Movie {
    constructor(dto) {
        this.sessions = new core_1.Collection(this);
        this.title = dto.title;
        this.duration = dto.duration;
        this.language = dto.language;
        this.subtitles = dto.subtitles;
        this.director = dto.director;
        this.mainActors = dto.mainActors;
        this.minAgeRequired = dto.minAgeRequired;
        this.startDate = dto.startDate;
        this.endDate = dto.endDate;
    }
};
exports.Movie = Movie;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Movie.prototype, "movieId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Movie.prototype, "duration", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Movie.prototype, "language", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Movie.prototype, "subtitles", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Movie.prototype, "director", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Movie.prototype, "mainActors", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Movie.prototype, "minAgeRequired", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Movie.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Movie.prototype, "endDate", void 0);
__decorate([
    (0, core_1.OneToMany)(() => movie_session_entity_1.MovieSession, (session) => session.movie),
    __metadata("design:type", Object)
], Movie.prototype, "sessions", void 0);
exports.Movie = Movie = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [dto_1.CreateMovieDto])
], Movie);
//# sourceMappingURL=movie.entity.js.map