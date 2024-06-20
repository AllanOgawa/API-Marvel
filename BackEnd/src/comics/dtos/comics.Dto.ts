import { IsString, IsNumber, IsDate } from 'class-validator';

export class ComicsDto {

    @IsNumber()
    id: number;

    @IsNumber()
    issueNumber: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    onsaleDate: Date;

    @IsNumber()
    price: number;

    @IsString()
    thumbnail: string;
}