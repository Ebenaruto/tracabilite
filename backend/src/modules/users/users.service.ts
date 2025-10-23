import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      lastLoginAt: new Date(),
      failedLoginAttempts: 0,
    });
  }

  async incrementFailedLoginAttempts(userId: string): Promise<void> {
    const user = await this.findOne(userId);
    const attempts = user.failedLoginAttempts + 1;

    if (attempts >= 5) {
      const blockedUntil = new Date();
      blockedUntil.setMinutes(blockedUntil.getMinutes() + 15);

      await this.userRepository.update(userId, {
        failedLoginAttempts: attempts,
        blockedUntil,
      });
    } else {
      await this.userRepository.update(userId, {
        failedLoginAttempts: attempts,
      });
    }
  }

  async resetFailedLoginAttempts(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      failedLoginAttempts: 0,
      blockedUntil: undefined,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}