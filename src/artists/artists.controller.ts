import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Artist } from './artist.schema';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UsePipes(new ValidationPipe())
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId): Promise<Artist> {
    const result = this.artistsService.findOne(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId): Promise<Artist> {
    const result = this.artistsService.delete(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Put(':id')
  update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id') id: ObjectId,
  ): Promise<Artist> {
    return this.artistsService.update(id, updateArtistDto);
  }
}
