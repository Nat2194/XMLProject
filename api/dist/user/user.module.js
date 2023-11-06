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
exports.UserModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const nestjs_2 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const config_1 = require("../shared/configs/config");
let UserModule = class UserModule {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        if ((await this.userRepository.count()) === 0) {
            const adminUser = new user_entity_1.User({
                firstname: config_1.config.get('admin.firstname'),
                lastname: config_1.config.get('admin.lastname'),
                mail: config_1.config.get('admin.mail'),
            });
            await adminUser.setPassword(config_1.config.get('admin.password'));
            await this.userRepository.persistAndFlush(adminUser);
        }
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature({ entities: [user_entity_1.User] })],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    }),
    __param(0, (0, nestjs_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository])
], UserModule);
//# sourceMappingURL=user.module.js.map