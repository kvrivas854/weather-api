import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  // Enable CORS with default settings
  app.enableCors();

  // Alternatively, configure specific CORS settings
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(port);

}
bootstrap();
