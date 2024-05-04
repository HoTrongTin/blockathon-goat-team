import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './components/auth/auth.module'
import { UserModule } from './components/user/user.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(),
    //added to the imports array
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor
    // }
  ]
})
export class AppModule {}
