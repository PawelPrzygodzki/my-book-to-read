import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import ormconfig from './config/ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ListModule,
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
