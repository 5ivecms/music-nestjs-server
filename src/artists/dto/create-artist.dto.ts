import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly image: string;
}
