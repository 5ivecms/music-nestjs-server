import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Artist, ArtistDocument } from './artist.schema';
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
  async findAll(query: any): Promise<Artist[]> {
    const result = this.artistModel.find().where;
    //console.log({});
    console.log(
      //await this.artistModel.find({ title: { $regex: '.*7.*' } }).exec(),
      await this.artistModel.find({}).exec(),
    );
    return await this.artistModel.find().exec();
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

  async update(id: ObjectId, artistDto: UpdateArtistDto): Promise<Artist> {
    return await this.artistModel.findByIdAndUpdate(id, artistDto, {
      new: true,
    });
  }
}
