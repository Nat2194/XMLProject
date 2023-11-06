"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const config_1 = require("./config");
const redis = require("redis");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('Redis');
const redisClient = redis.createClient({
    socket: {
        host: config_1.config.get('redis.host'),
        port: config_1.config.get('redis.port'),
    },
    password: config_1.config.get('redis.password'),
    legacyMode: true,
});
exports.redisClient = redisClient;
redisClient.on('error', (err) => {
    logger.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', () => {
    logger.log('Connected to redis successfully');
});
redisClient.on('ready', () => {
    logger.log('Redis is ready');
});
//# sourceMappingURL=redis.config.js.map