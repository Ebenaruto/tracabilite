import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
  } from '@nestjs/common';
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
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    ) {}
  
    async validateUser(email: string, password: string): Promise<User | null> {
      const user = await this.usersService.findByEmail(email);
  
      if (!user) {
        return null;
      }
  
      // Vérifier si le compte est bloqué
      if (user.blockedUntil && user.blockedUntil > new Date()) {
        throw new UnauthorizedException(
          `Compte bloqué jusqu'à ${user.blockedUntil.toLocaleString()}`,
        );
      }
  
      // Vérifier le statut
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Compte désactivé');
      }
  
      // Vérifier le mot de passe
      const isPasswordValid = await this.usersService.comparePasswords(
        password,
        user.password,
      );
  
      if (!isPasswordValid) {
        await this.usersService.incrementFailedLoginAttempts(user.id);
        return null;
      }
  
      // Réinitialiser les tentatives échouées
      await this.usersService.resetFailedLoginAttempts(user.id);
  
      return user;
    }
  
    async login(loginDto: LoginDto): Promise<AuthResponse> {
      const user = await this.validateUser(loginDto.email, loginDto.password);
  
      if (!user) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
  
      // Mettre à jour la dernière connexion
      await this.usersService.updateLastLogin(user.id);
  
      return this.generateTokens(user);
    }
  
    async register(registerDto: RegisterDto): Promise<AuthResponse> {
      // Vérifier si l'email existe déjà
      const existingUser = await this.usersService.findByEmail(registerDto.email);
  
      if (existingUser) {
        throw new BadRequestException('Cet email est déjà utilisé');
      }
  
      // Hasher le mot de passe
      const hashedPassword = await this.usersService.hashPassword(
        registerDto.password,
      );
  
      // Créer l'utilisateur
      const user = await this.usersService.create({
        email: registerDto.email,
        password: hashedPassword,
        fullName: registerDto.fullName,
        phone: registerDto.phone,
        status: UserStatus.ACTIVE,
      });
  
      return this.generateTokens(user);
    }
  
    private async generateTokens(user: User): Promise<AuthResponse> {
      const payload: JwtPayload = {
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
  
    async refreshToken(oldRefreshToken: string): Promise<AuthResponse> {
      try {
        const payload = this.jwtService.verify(oldRefreshToken, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
  
        const user = await this.usersService.findOne(payload.sub);
  
        return this.generateTokens(user);
      } catch (error) {
        throw new UnauthorizedException('Refresh token invalide');
      }
    }
  }