import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get } from 'lodash';
import { Model, ObjectId } from 'mongoose';
import { ICrudQuery } from 'src/lib/crud-query.decorator';
import { Artist, ArtistDocument } from './artist.schema';
import { BulkDeleteArtistsDto } from './dto/bulk-delete-artists.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  // https://github.com/scalablescripts/nest-search-mongo/blob/main/src/product/product.controller.ts
  // https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
  //https://github.com/topfullstack/nestjs-mongoose-crud

  async findAll(query: ICrudQuery): Promise<IFindAll<Artist>> {
    const find = get(query, 'find', {});
    const where = get(query, 'where', {});
    const sort = get(query, 'sort', {});
    const page = get(query, 'page', 1);
    const limit = get(query, 'limit', 10);

    const total = await this.artistModel.find(find).where(where).count().exec();
    const lastPage = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const items = await this.artistModel
      .find(find)
      .where(where)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    return {
      items,
      total,
      page,
      lastPage,
      limit,
    };
  }

  async findOne(id: ObjectId): Promise<Artist> {
    return await this.artistModel.findById(id);
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const createdArtist = new this.artistModel(createArtistDto);
    return await createdArtist.save();
  }

  async delete(id: ObjectId): Promise<Artist> {
    return await this.artistModel.findByIdAndRemove(id);
  }

  async bulkDelete(bulkDelete: BulkDeleteArtistsDto) {
    return await this.artistModel.deleteMany({
      _id: { $in: [...bulkDelete._ids] },
    });
  }

  async update(id: ObjectId, artistDto: UpdateArtistDto): Promise<Artist> {
    return await this.artistModel.findByIdAndUpdate(id, artistDto, {
      new: true,
    });
  }
}
