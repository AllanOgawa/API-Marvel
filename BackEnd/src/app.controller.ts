import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    async fetchApi(): Promise<any> {
        try {
            const data = await this.appService.fetchApi();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }
}