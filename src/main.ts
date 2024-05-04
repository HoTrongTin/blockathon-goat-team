import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AuthModule } from './components/auth/auth.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('IBMEX API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('IBMEX')
    // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'jwt' }, 'api-key')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AuthModule]
  })
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }
  })

  await app.listen(3000)
}
bootstrap()
