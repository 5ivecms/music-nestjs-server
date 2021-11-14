import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArtistModel } from './artist.model';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: ArtistModel, schemaOptions: { collection: 'artists' } },
    ]),
  ],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
