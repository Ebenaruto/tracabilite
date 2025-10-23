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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    usersService;
    jwtService;
    configService;
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null;
        }
        if (user.blockedUntil && user.blockedUntil > new Date()) {
            throw new common_1.UnauthorizedException(`Compte bloqué jusqu'à ${user.blockedUntil.toLocaleString()}`);
        }
        if (user.status !== user_entity_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Compte désactivé');
        }
        const isPasswordValid = await this.usersService.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            await this.usersService.incrementFailedLoginAttempts(user.id);
            return null;
        }
        await this.usersService.resetFailedLoginAttempts(user.id);
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        await this.usersService.updateLastLogin(user.id);
        return this.generateTokens(user);
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Cet email est déjà utilisé');
        }
        const hashedPassword = await this.usersService.hashPassword(registerDto.password);
        const user = await this.usersService.create({
            email: registerDto.email,
            password: hashedPassword,
            fullName: registerDto.fullName,
            phone: registerDto.phone,
            status: user_entity_1.UserStatus.ACTIVE,
        });
        return this.generateTokens(user);
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles?.map((role) => role.name) || [],
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '30m'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                status: user.status,
                roles: user.roles || [],
            },
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(oldRefreshToken) {
        try {
            const payload = this.jwtService.verify(oldRefreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const user = await this.usersService.findOne(payload.sub);
            return this.generateTokens(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token invalide');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map