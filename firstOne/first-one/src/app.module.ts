import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserControllersController } from './controllers/user-controllers/user-controllers.controller';

@Module({
  imports: [],
  controllers: [AppController, UserControllersController],
  providers: [AppService],
})
export class AppModule {}
