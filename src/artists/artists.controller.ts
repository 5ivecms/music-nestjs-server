import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ARTIST_NOT_FOUND } from './artists.constants';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return await this.artistsService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedArtist = await this.artistsService.delete(id);
    if (!deletedArtist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedArtist;
  }
}
