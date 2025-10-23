import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LotsModule } from './modules/lots/lots.module';
import { ProducersModule } from './modules/producers/producers.module';
import { ParcelsModule } from './modules/parcels/parcels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('=== TYPEORM CONFIG ===');
        console.log('PASSWORD from env:', configService.get('DATABASE_PASSWORD'));
        console.log('PASSWORD type:', typeof configService.get('DATABASE_PASSWORD'));
        
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 5432),
          username: configService.get('DATABASE_USER', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'Admin'),
          database: configService.get('DATABASE_NAME', 'traca_db'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('DATABASE_LOGGING') === 'true',
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    LotsModule,
    ProducersModule,
    ParcelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}