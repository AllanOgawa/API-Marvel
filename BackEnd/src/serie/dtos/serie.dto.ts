import { IsString, IsNumber } from 'class-validator';

export class CreateSerieDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    startYear: number;

    @IsNumber()
    endYear: number;

    @IsString()
    thumbnail: string;
}