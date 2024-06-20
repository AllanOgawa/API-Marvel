import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Characters } from './schemas/characters.schema';
import { CharactersDto } from './dtos/characters.Dto';
import { Comics } from 'src/comics/schemas/comics.schema';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }

    @Get()
    async findAll(): Promise<Characters[]> {
        return await this.charactersService.findAll();
    }

    @Get('total')
    async getTotalCharacters(): Promise<any> {
        try {
            const data = await await this.charactersService.getTotalCharacters();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Get(':id')
    async find(@Param() params: any): Promise<Characters> {
        return await this.charactersService.find(params.id)
    }

    @Get(':id/comics')
    async findComicsOfCharacter(@Param() params: any): Promise<Comics[]> {
        try {
            const data = await this.charactersService.findComicsOfCharacter(params.id);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    @Post()
    async create(@Body() dto: CharactersDto): Promise<Characters> {
        return await this.charactersService.create(dto)
    }

    @Put(':id')
    async update(@Param() params: any, @Body() dto: CharactersDto): Promise<Characters> {
        return await this.charactersService.update(params.id, dto)
    }

    @Delete(':id')
    async delete(@Param() params: any): Promise<Characters> {
        return await this.charactersService.delete(params.id)
    }
}