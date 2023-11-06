"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("@mikro-orm/reflection");
const common_1 = require("@nestjs/common");
exports.default = {
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    type: 'postgresql',
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    debug: true,
    forceUtcTimezone: true,
    allowGlobalContext: true,
    findOneOrFailHandler: (entityName) => {
        throw new common_1.NotFoundException(`${entityName} not found`);
    },
};
//# sourceMappingURL=mikro-orm.config.js.map