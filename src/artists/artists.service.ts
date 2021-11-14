import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ArtistModel } from './artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(ArtistModel)
    private readonly artistModel: ModelType<ArtistModel>,
  ) {}

  async create(dto: CreateArtistDto): Promise<DocumentType<ArtistModel>> {
    return this.artistModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ArtistModel> | null> {
    return this.artistModel.findByIdAndDelete(id).exec();
  }
}
