import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comics, ComicsSchema } from './schemas/comics.schema';
import { Characters, CharactersSchema } from 'src/characters/schemas/characters.schema';
import { Creators, CreatorsSchema } from 'src/creators/schemas/creators.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Comics.name, schema: ComicsSchema },
        { name: Characters.name, schema: CharactersSchema },
        { name: Creators.name, schema: CreatorsSchema }
    ])],
    controllers: [ComicsController],
    providers: [ComicsService],
})

export class ComicsModule { }
