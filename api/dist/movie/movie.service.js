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
exports.MovieService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const movie_entity_1 = require("./movie.entity");
let MovieService = class MovieService {
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    async createMovie(dto) {
        if (await this.movieRepository.findOne({ title: dto.title })) {
            throw new common_1.ConflictException('Movie with the same title already exists');
        }
        const movie = new movie_entity_1.Movie(dto);
        await this.movieRepository.persistAndFlush(movie);
        return movie;
    }
    async findAllMovies() {
        return this.movieRepository.findAll();
    }
    async findMovieById(movieId) {
        try {
            return await this.movieRepository.findOneOrFail({ movieId });
        }
        catch (error) {
            throw new common_1.NotFoundException('Movie not found');
        }
    }
    async updateMovie(movieId, dto) {
        const movie = await this.findMovieById(movieId);
        (0, core_1.wrap)(movie).assign(dto);
        await this.movieRepository.flush();
        return movie;
    }
    async deleteMovie(movieId) {
        const movie = await this.findMovieById(movieId);
        await this.movieRepository.removeAndFlush(movie);
    }
    async addSessionToMovie(session) {
        const movie = session.movie;
        movie.sessions.add(session);
        await this.movieRepository.flush();
        return session;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository])
], MovieService);
//# sourceMappingURL=movie.service.js.map