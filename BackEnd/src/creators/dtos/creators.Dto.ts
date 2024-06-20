import { IsString, IsNumber, IsObject } from 'class-validator';
import { Comics } from 'src/comics/schemas/comics.schema';

export class CreatorsDto {

    @IsNumber()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    fullName: string;

    @IsString()
    thumbnail: string;

    @IsString()
    role: string;

    @IsObject()
    comics: Comics[];
}