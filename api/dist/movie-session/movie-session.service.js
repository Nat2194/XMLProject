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
exports.MovieSessionService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const movie_session_entity_1 = require("./movie-session.entity");
const movie_service_1 = require("../movie/movie.service");
let MovieSessionService = class MovieSessionService {
    constructor(movieSessionRepository, movieService) {
        this.movieSessionRepository = movieSessionRepository;
        this.movieService = movieService;
    }
    async addSessionToMovie(dto) {
        if (await this.movieSessionRepository.findOne({
            movie: await this.movieService.findMovieById(dto.movieId),
            startDate: dto.startDate,
            endDate: dto.endDate,
        })) {
            throw new common_1.ConflictException('Movie Session with the same date already exists');
        }
        const movieSession = new movie_session_entity_1.MovieSession(dto);
        await this.movieSessionRepository.flush();
        return await this.movieService.addSessionToMovie(movieSession);
    }
    async findAllMovieSessions() {
        return this.movieSessionRepository.findAll();
    }
    async findMovieSessionById(sessionId) {
        try {
            return await this.movieSessionRepository.findOneOrFail({
                sessionId,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found');
        }
    }
    async findMovieSessionsByMovieId(movieId) {
        try {
            return await this.movieSessionRepository.find({
                movie: await this.movieService.findMovieById(movieId),
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found for this Movie');
        }
    }
    async findMovieSessionsByMovieName(name) {
        try {
            return await this.movieSessionRepository.find({
                movie: await this.movieService.findMovieByPartialName(name),
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found for this Movie');
        }
    }
    async findMovieSessionsByCity(city) {
        try {
            return await this.movieSessionRepository.find({
                theatreCity: city,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found for this City');
        }
    }
    async findMovieSessionsByDate(date) {
        try {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            return await this.movieSessionRepository.find({
                startDate: { $gte: startOfDay, $lte: endOfDay },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found for this Date');
        }
    }
    async findMovieSessionsByDateRange(startDate, endDate) {
        try {
            return await this.movieSessionRepository.find({
                startDate: startDate,
                endDate: endDate,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie Session not found for this Date');
        }
    }
    async updateMovieSession(sessionId, dto) {
        const session = await this.findMovieSessionById(sessionId);
        (0, core_1.wrap)(session).assign(dto);
        await this.movieSessionRepository.flush();
        return session;
    }
    async deleteMovieSession(sessionId) {
        const session = await this.findMovieSessionById(sessionId);
        await this.movieSessionRepository.removeAndFlush(session);
    }
};
exports.MovieSessionService = MovieSessionService;
exports.MovieSessionService = MovieSessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(movie_session_entity_1.MovieSession)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        movie_service_1.MovieService])
], MovieSessionService);
//# sourceMappingURL=movie-session.service.js.map