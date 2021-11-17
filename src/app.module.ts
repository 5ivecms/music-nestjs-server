import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArtistsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/music'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
