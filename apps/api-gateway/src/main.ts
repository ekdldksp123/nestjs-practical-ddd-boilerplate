import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import waitOn from 'wait-on';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  const logger = app.get<OgmaService>(OgmaService);

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.use(cookieParser());
  app.useLogger(logger);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.enableShutdownHooks();
  await app.listen(port).then(() => {
    logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  });
}
const options = {
  resources: ['http://localhost:4001', 'http://localhost:4003'],
};
waitOn(options)
  .then(() => {
    bootstrap();
  })
  .catch((err) => {
    console.error(err);
  });
