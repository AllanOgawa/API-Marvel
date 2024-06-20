import { IsString, IsNumber, IsObject } from 'class-validator';
import { Comics } from 'src/comics/schemas/comics.schema';

export class CharactersDto {

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    thumbnail: string;

    @IsObject()
    comics: Comics[];
}