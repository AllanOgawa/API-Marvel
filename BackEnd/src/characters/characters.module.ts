import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Characters, CharactersSchema } from './schemas/characters.schema';
import { Comics, ComicsSchema } from 'src/comics/schemas/comics.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Characters.name, schema: CharactersSchema }, { name: Comics.name, schema: ComicsSchema }])],
    controllers: [CharactersController],
    providers: [CharactersService],
})

export class CharactersModule { }
