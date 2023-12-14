import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { DostypModule } from './dostyp/dostyp.module';
import { WorkerModule } from './worker/worker.module';
import { TyrniketModule } from './tyrniket/tyrniket.module';
import { OtmetkaModule } from './otmetka/otmetka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    DostypModule,
    OtmetkaModule,
    TyrniketModule,
    WorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
