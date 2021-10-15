import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FRONT_END_PATH } from './shared/constants';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: FRONT_END_PATH })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
