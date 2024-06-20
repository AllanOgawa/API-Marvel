import { Controller, Get } from '@nestjs/common';
import { SerieService } from './serie.service';
import { Series } from './schemas/serie.schema';

@Controller('series')
export class SerieController {
    constructor(private readonly serieService: SerieService) { }

    @Get()
    async findAll(): Promise<Series[]> {
        return await this.serieService.findAll();
    }
}