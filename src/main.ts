import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import "dotenv/config"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({origin : "*"});
  
  const config = new DocumentBuilder()  
  .setTitle('TablesBuilder')
  .setDescription('API documentada para o TablesBuilder')
  .setVersion('1.0')
  .addTag('api-tables-builder')
  .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 5003;
  
  await app.listen(port);
}
bootstrap();
