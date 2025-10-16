"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'postgres',
    host: String(process.env.DATABASE_HOST ?? 'localhost'),
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: String(process.env.DATABASE_USER ?? 'postgres'),
    password: String(process.env.DATABASE_PASSWORD ?? ''),
    database: String(process.env.DATABASE_NAME ?? 'postgres'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.DATABASE_LOGGING === 'true',
}));
//# sourceMappingURL=database.config.js.map