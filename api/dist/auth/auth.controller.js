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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const config_1 = require("../shared/configs/config");
const auth_decorator_1 = require("./auth.decorator");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(user, res) {
        const userLogin = await this.authService.validateUser(user);
        const auth = await this.authService.login(userLogin);
        res
            .cookie('accessToken', auth.accessToken, AuthController_1.cookieOption.secure(config_1.config.get('jwt.accessTokenExpirationTime')))
            .cookie('accessTokenExpirationTime', auth.accessTokenExpirationTime, AuthController_1.cookieOption.basic(config_1.config.get('jwt.accessTokenExpirationTime')))
            .cookie('refreshToken', auth.refreshToken, AuthController_1.cookieOption.secure(config_1.config.get('jwt.refreshTokenExpirationTime')))
            .cookie('refreshTokenExpirationTime', auth.refreshTokenExpirationTime, AuthController_1.cookieOption.basic(config_1.config.get('jwt.refreshTokenExpirationTime')));
        return userLogin;
    }
    async refresh(req, res) {
        const auth = await this.authService.refresh(req?.signedCookies?.refreshToken);
        res
            .cookie('accessToken', auth.accessToken, AuthController_1.cookieOption.secure(config_1.config.get('jwt.accessTokenExpirationTime')))
            .cookie('accessTokenExpirationTime', auth.accessTokenExpirationTime, AuthController_1.cookieOption.basic(config_1.config.get('jwt.accessTokenExpirationTime')));
    }
    async test(req) {
        return { a: req.signedCookies, b: req.cookies };
    }
    async logout(res) {
        res
            .clearCookie('accessToken')
            .clearCookie('accessTokenExpirationTime')
            .clearCookie('refreshToken')
            .clearCookie('refreshTokenExpirationTime');
    }
};
exports.AuthController = AuthController;
AuthController.cookieOption = {
    secure: (maxAge) => ({
        httpOnly: true,
        sameSite: true,
        maxAge: maxAge * 1000,
        signed: true,
        secure: config_1.config.get('api.nodeEnv') === 'prod',
    }),
    basic: (maxAge) => ({
        sameSite: true,
        maxAge: maxAge * 1000,
        secure: config_1.config.get('api.nodeEnv') === 'prod',
    }),
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map