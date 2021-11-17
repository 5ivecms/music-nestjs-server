import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  alias: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly image: string;
}
