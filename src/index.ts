import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api';
import { AppConfigOptions } from './common';
import { AllExceptionsFilter } from './infrastructure';

export class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appConfig = configService.get<AppConfigOptions>('app');

    app.setGlobalPrefix('api');
    app.enableCors({ origin: '*' });
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(appConfig.port, () => {
      console.log(
        `Server is running on http://${appConfig.host}:${appConfig.port}`,
      );
    });
  }
}
