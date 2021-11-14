import { prop } from '@typegoose/typegoose';

export class ArtistModel {
  @prop()
  title: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  description: string;

  @prop()
  image: string;
}
