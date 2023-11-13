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
exports.CreateMovieSessionDto = void 0;
const class_validator_1 = require("class-validator");
const validator_1 = require("../decorator/validator");
class CreateMovieSessionDto {
}
exports.CreateMovieSessionDto = CreateMovieSessionDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validator_1.IsDateWithTime)(),
    __metadata("design:type", Date)
], CreateMovieSessionDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validator_1.IsDateWithTime)(),
    __metadata("design:type", Date)
], CreateMovieSessionDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieSessionDto.prototype, "theatreName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieSessionDto.prototype, "theatreAddress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovieSessionDto.prototype, "theatreCity", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMovieSessionDto.prototype, "movieId", void 0);
//# sourceMappingURL=create-movie-session.dto.js.map