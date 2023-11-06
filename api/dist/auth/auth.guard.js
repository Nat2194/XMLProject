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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
let AuthGuard = class AuthGuard {
    constructor(userService, authService, jwtService, reflector) {
        this.userService = userService;
        this.authService = authService;
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        request.user = await this.verifyToken(context, request);
        return request.user !== null;
    }
    async verifyToken(context, request) {
        const token = request?.signedCookies?.accessToken;
        if (!token) {
            throw new common_1.UnauthorizedException('Token is missing');
        }
        if (!(await this.jwtService.verifyAsync(token, this.authService.getOptions('access')))) {
            throw new common_1.UnauthorizedException('Token is invalid');
        }
        const payload = this.jwtService.decode(token);
        if (!payload) {
            throw new common_1.UnauthorizedException('Token is invalid');
        }
        const user = await this.userService.findOne(payload.sub);
        if (user.lastLogin !== payload.iat) {
            throw new common_1.UnauthorizedException('User already logged in');
        }
        return user;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        jwt_1.JwtService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map