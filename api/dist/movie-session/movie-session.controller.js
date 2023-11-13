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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSessionController = void 0;
const common_1 = require("@nestjs/common");
const movie_session_service_1 = require("./movie-session.service");
const dto_1 = require("./dto");
const auth_decorator_1 = require("../auth/auth.decorator");
const parse_date_pipe_1 = require("../shared/validators/parse-date-pipe");
let MovieSessionController = class MovieSessionController {
    constructor(movieSessionService) {
        this.movieSessionService = movieSessionService;
    }
    create(session) {
        return this.movieSessionService.addSessionToMovie(session);
    }
    findAll() {
        return this.movieSessionService.findAllMovieSessions();
    }
    findOne(sessionId) {
        return this.movieSessionService.findMovieSessionById(sessionId);
    }
    findMovieSessionsByMovie(movieId) {
        return this.movieSessionService.findMovieSessionsByMovie(movieId);
    }
    findMovieSessionsByCity(cityName) {
        return this.movieSessionService.findMovieSessionsByCity(cityName);
    }
    findMovieSessionsByDate(date) {
        return this.movieSessionService.findMovieSessionsByDate(date);
    }
    findMovieSessionsByDateRange(startDate, endDate) {
        return this.movieSessionService.findMovieSessionsByDateRange(startDate, endDate);
    }
    update(sessionId, dto) {
        return this.movieSessionService.updateMovieSession(sessionId, dto);
    }
    delete(sessionId) {
        return this.movieSessionService.deleteMovieSession(sessionId);
    }
};
exports.MovieSessionController = MovieSessionController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMovieSessionDto]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('movie/:movieId'),
    __param(0, (0, common_1.Param)('movieId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findMovieSessionsByMovie", null);
__decorate([
    (0, common_1.Get)('city/:cityName'),
    __param(0, (0, common_1.Param)('cityName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findMovieSessionsByCity", null);
__decorate([
    (0, common_1.Get)('date/:date'),
    __param(0, (0, common_1.Param)('date', parse_date_pipe_1.ParseDatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findMovieSessionsByDate", null);
__decorate([
    (0, common_1.Get)('date/:startDate/:endDate'),
    __param(0, (0, common_1.Param)('startDate', parse_date_pipe_1.ParseDatePipe)),
    __param(1, (0, common_1.Param)('endDate', parse_date_pipe_1.ParseDatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "findMovieSessionsByDateRange", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateMovieSessionDto]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieSessionController.prototype, "delete", null);
exports.MovieSessionController = MovieSessionController = __decorate([
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [movie_session_service_1.MovieSessionService])
], MovieSessionController);
//# sourceMappingURL=movie-session.controller.js.map