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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const config_1 = require("../shared/configs/config");
const dayjs = require("dayjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const loginDate = dayjs();
        await this.userService.update(user.userId, {
            lastLogin: loginDate.unix(),
        });
        return {
            accessToken: await this.sign({ sub: user.userId }, this.getOptions('access'), loginDate.unix()),
            accessTokenExpirationTime: loginDate
                .add(config_1.config.get('jwt.accessTokenExpirationTime'), 's')
                .unix(),
            refreshToken: await this.sign({ sub: user.userId }, this.getOptions('refresh'), loginDate.unix()),
            refreshTokenExpirationTime: loginDate
                .add(config_1.config.get('jwt.refreshTokenExpirationTime'), 's')
                .unix(),
        };
    }
    async validateUser(dto) {
        const user = await this.userService.findByMail(dto.mail);
        if (user === null) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.comparePassword(dto.password)) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async sign(payload, options, iat) {
        return this.jwtService.signAsync({
            ...payload,
            iat,
        }, options);
    }
    getOptions(type) {
        return {
            secret: config_1.config.get(`jwt.${type}Secret`),
            expiresIn: `${config_1.config.get(`jwt.${type}TokenExpirationTime`)}s`,
        };
    }
    async refresh(refreshToken) {
        try {
            const token = await this.jwtService.verifyAsync(refreshToken, {
                secret: config_1.config.get('jwt.refreshSecret'),
            });
            const loginDate = dayjs();
            if (token.exp < loginDate.unix()) {
                throw null;
            }
            await this.userService.update(token.sub, {
                lastLogin: loginDate.unix(),
            });
            return {
                accessToken: await this.sign({ sub: token.userId }, this.getOptions('access'), loginDate.unix()),
                accessTokenExpirationTime: loginDate
                    .add(config_1.config.get('jwt.accessTokenExpirationTime'), 's')
                    .unix(),
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map