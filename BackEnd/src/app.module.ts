import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsModule } from './comics/comics.module';
import { CreatorsModule } from './creators/creators.module';
import { CharactersModule } from './characters/characters.module';
import { Series, SerieSchema } from './serie/schemas/serie.schema';
import { Comics, ComicsSchema } from './comics/schemas/comics.schema';
import { Creators, CreatorsSchema } from './creators/schemas/creators.schema';
import { Characters, CharactersSchema } from './characters/schemas/characters.schema';
import { SerieModule } from './serie/serie.module';

@Module({
  imports: [
    ComicsModule,
    CreatorsModule,
    CharactersModule,
    SerieModule,
    MongooseModule.forRoot('mongodb://localhost:27017/marvel'),
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
      { name: Comics.name, schema: ComicsSchema },
      { name: Creators.name, schema: CreatorsSchema },
      { name: Series.name, schema: SerieSchema }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }