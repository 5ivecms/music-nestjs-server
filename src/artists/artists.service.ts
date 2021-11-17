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

  async findAll(): Promise<Artist[]> {
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
