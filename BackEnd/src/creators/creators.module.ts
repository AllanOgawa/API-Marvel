import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Creators, CreatorsSchema } from './schemas/creators.schema';
import { Comics, ComicsSchema } from 'src/comics/schemas/comics.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Creators.name, schema: CreatorsSchema }, { name: Comics.name, schema: ComicsSchema }])],
    controllers: [CreatorsController],
    providers: [CreatorsService],
})

export class CreatorsModule { }
