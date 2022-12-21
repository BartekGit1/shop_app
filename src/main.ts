import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        // https://github.com/typestack/class-validator/issues/305#issuecomment-752751893
        whitelist: true, // i supose this creates a white list with properties
        forbidNonWhitelisted: true, // i supose this restrict by white list criteria
        forbidUnknownValues: true, // i dont know why exists
    }));
    await app.listen(3000);
}

bootstrap();
