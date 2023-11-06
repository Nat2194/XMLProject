"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateWithTime = exports.IsMovieSession = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const movie_session_entity_1 = require("../movie-session.entity");
function IsMovieSession(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsMovieSession',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    let verif = true;
                    if (!(value instanceof movie_session_entity_1.MovieSession)) {
                        verif = false;
                        throw new common_1.NotAcceptableException('Not a MovieSession object');
                    }
                    return verif;
                },
            },
        });
    };
}
exports.IsMovieSession = IsMovieSession;
function IsDateWithTime(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isDateWithTime',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (!(value instanceof Date)) {
                        return false;
                    }
                    const timeRegex = /^(\d{2}:\d{2}:\d{2})$/;
                    return timeRegex.test(value.toTimeString().split(' ')[0]);
                },
            },
        });
    };
}
exports.IsDateWithTime = IsDateWithTime;
//# sourceMappingURL=validator.js.map