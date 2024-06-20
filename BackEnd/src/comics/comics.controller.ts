import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { Comics } from './schemas/comics.schema';
import { ComicsDto } from './dtos/comics.Dto';
import { Characters } from 'src/characters/schemas/characters.schema';
import { Creators } from 'src/creators/schemas/creators.schema';

@Controller('comics')
export class ComicsController {
    constructor(private readonly comicsService: ComicsService) { }

    @Get()
    async findAll(): Promise<Comics[]> {
        return await this.comicsService.findAll();
    }

    @Get('total')
    async getTotalComics(): Promise<any> {
        try {
            const data = await await this.comicsService.getTotalComics();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Get(':issueNumber')
    async find(@Param() params: any): Promise<Comics> {
        return await this.comicsService.find(params.issueNumber);
    }

    @Get(':issueNumber/characters')
    async findCharacterOfComics(@Param() params: any): Promise<Characters[]> {
        try {
            const data = await this.comicsService.findCharacterOfComics(params.issueNumber);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Get(':issueNumber/creators')
    async findCreatorsOfComics(@Param() params: any): Promise<Creators[]> {
        try {
            const data = await this.comicsService.findCreatorsOfComics(params.issueNumber);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Post()
    async create(@Body() dto: ComicsDto): Promise<Comics> {
        return await this.comicsService.create(dto)
    }

    @Put(':issueNumber')
    async update(@Param() params: any, @Body() dto: ComicsDto): Promise<Comics> {
        return await this.comicsService.update(params.issueNumber, dto)
    }

    @Delete(':issueNumber')
    async delete(@Param() params: any): Promise<Comics> {
        return await this.comicsService.delete(params.issueNumber)
    }
}