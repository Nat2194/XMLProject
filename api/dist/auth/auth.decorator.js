"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('claims', roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map