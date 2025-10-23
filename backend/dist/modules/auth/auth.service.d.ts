import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User, UserStatus } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export interface JwtPayload {
    sub: string;
    email: string;
    roles: string[];
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        fullName: string;
        status: UserStatus;
        roles: any[];
    };
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    private generateTokens;
    refreshToken(oldRefreshToken: string): Promise<AuthResponse>;
}
