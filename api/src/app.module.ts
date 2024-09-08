import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { ModsModule } from './mods/mods.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/*.ts'],
    }),
    UsersModule,
    AuthModule,
    GamesModule,
    ModsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
