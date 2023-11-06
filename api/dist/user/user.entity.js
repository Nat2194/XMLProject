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
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const bcrypt = require("bcrypt");
const dto_1 = require("./dto");
let User = class User {
    constructor(dto) {
        this.firstname = dto.firstname;
        this.lastname = dto.lastname;
        this.mail = dto.mail;
    }
    async comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
    async setPassword(password) {
        this.password = await bcrypt.hash(password, 10);
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "mail", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', hidden: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)({ hidden: true, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "lastLogin", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [dto_1.CreateUserDto])
], User);
//# sourceMappingURL=user.entity.js.map