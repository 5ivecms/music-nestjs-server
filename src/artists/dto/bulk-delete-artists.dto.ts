import { IsNotEmpty } from 'class-validator';

export class BulkDeleteArtistsDto {
  @IsNotEmpty()
  _ids: string[];
}
