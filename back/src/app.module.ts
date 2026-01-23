import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Tu usuario de MySQL
      password: '', // Tu contraseña de MySQL (déjalo vacío si no tienes)
      database: 'vertex_games', // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo
      autoLoadEntities: true,
    }),
    AuthModule,
    GamesModule,
  ],
})
export class AppModule {}
