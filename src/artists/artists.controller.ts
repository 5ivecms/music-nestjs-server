import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CrudQuery, ICrudQuery } from 'src/lib/crud-query.decorator';
import { Artist } from './artist.schema';
import { ArtistsService } from './artists.service';
import { BulkDeleteArtistsDto } from './dto/bulk-delete-artists.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UsePipes(new ValidationPipe())
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll(@CrudQuery() query: ICrudQuery): Promise<IFindAll<Artist>> {
    return this.artistsService.findAll(query);
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

  @Post('bulkDelete')
  async bulkDelete(@Body() bulkDeleteDto: BulkDeleteArtistsDto): Promise<any> {
    const result = await this.artistsService.bulkDelete(bulkDeleteDto);
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
