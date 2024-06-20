import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { Creators } from './schemas/creators.schema';
import { CreatorsDto } from './dtos/creators.Dto';
import { Comics } from 'src/comics/schemas/comics.schema';

@Controller('creators')
export class CreatorsController {
    constructor(private readonly creatorsService: CreatorsService) { }

    @Get()
    async findAll(): Promise<Creators[]> {
        return await this.creatorsService.findAll();
    }

    @Get(':id')
    async find(@Param() params: any): Promise<Creators> {
        return await this.creatorsService.find(params.id);
    }

    @Get(':id/comics')
    async findComicsOfCreator(@Param() params: any): Promise<Comics[]> {
        try {
            const data = await this.creatorsService.findComicsOfCreator(params.id);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Post()
    async create(@Body() dto: CreatorsDto): Promise<Creators> {
        return await this.creatorsService.create(dto)
    }

    @Put(':id')
    async update(@Param() params: any, @Body() dto: CreatorsDto): Promise<Creators> {
        return await this.creatorsService.update(params.id, dto)
    }

    @Delete(':id')
    async delete(@Param() params: any): Promise<Creators> {
        return await this.creatorsService.delete(params.id)
    }
}