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
exports.UserService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        if (await this.userRepository.findOne({ mail: dto.mail })) {
            throw new common_1.ConflictException('Email already used');
        }
        const user = new user_entity_1.User(dto);
        await user.setPassword(dto.password);
        await this.userRepository.persistAndFlush(user);
        return user;
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async findOne(userId) {
        return await this.userRepository.findOneOrFail({
            userId,
        });
    }
    async update(userId, dto) {
        const user = await this.userRepository.findOneOrFail({
            userId,
        });
        (0, core_1.wrap)(user).assign(dto);
        if (typeof dto.password !== 'undefined') {
            await user.setPassword(dto.password);
        }
        await this.userRepository.flush();
        return user;
    }
    async delete(userId) {
        await this.userRepository.removeAndFlush(await this.userRepository.findOneOrFail({
            userId,
        }));
    }
    async findByMail(mail) {
        return await this.userRepository.findOne({ mail });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository])
], UserService);
//# sourceMappingURL=user.service.js.map