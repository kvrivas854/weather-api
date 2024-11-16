import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CacheModule.register({
      ttl: 43200, // Cache time-to-live in seconds (default is 5 seconds)
      max: 1000, // Maximum number of items to store in cache
    }),
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService],
})
export class AppModule { }
