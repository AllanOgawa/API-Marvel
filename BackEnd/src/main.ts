import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.enableCors({
    origin: "http://localhost:5173"
  });
  await app.listen(3000);
}
bootstrap();
