// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { HttpAdapterHost, NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
// import { AppModule } from './app.module';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import type {
//   CorsConfig,
//   NestConfig,
//   SwaggerConfig,
// } from 'src/common/configs/config.interface';

// const CORS_OPTIONS = {
//   origin: ['*'], // or '*' or whatever is required
//   allowedHeaders: [
//     'Access-Control-Allow-Origin',
//     'Origin',
//     'X-Requested-With',
//     'Accept',
//     'Content-Type',
//     'Authorization',
//   ],
//   exposedHeaders: 'Authorization',
//   credentials: true,
//   methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
// };

// async function bootstrap() {
//   const adapter = new FastifyAdapter();
//   adapter.enableCors(CORS_OPTIONS);

//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     adapter
//   );

//   // Validation
//   app.useGlobalPipes(new ValidationPipe());

//   // enable shutdown hook
//   const prismaService: PrismaService = app.get(PrismaService);
//   prismaService.enableShutdownHooks(app);

//   // Prisma Client Exception Filter for unhandled exceptions
//   const { httpAdapter } = app.get(HttpAdapterHost);
//   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

//   const configService = app.get(ConfigService);
//   const nestConfig = configService.get<NestConfig>('nest');
//   const corsConfig = configService.get<CorsConfig>('cors');
//   const swaggerConfig = configService.get<SwaggerConfig>('swagger');

//   // Swagger Api
//   if (swaggerConfig.enabled) {
//     const options = new DocumentBuilder()
//       .setTitle(swaggerConfig.title || 'Nestjs')
//       .setDescription(swaggerConfig.description || 'The nestjs API description')
//       .setVersion(swaggerConfig.version || '1.0')
//       .build();
//     const document = SwaggerModule.createDocument(app, options);

//     SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
//   }

//   // // Cors
//   // if (corsConfig.enabled) {
//   // app.enableCors();
//   // }

//   await app.listen(process.env.PORT || nestConfig.port || 3000);
// }
// bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
