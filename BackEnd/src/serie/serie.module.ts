import { Module } from '@nestjs/common';
import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SerieSchema, Series } from './schemas/serie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Series.name, schema: SerieSchema }])],
  controllers: [SerieController],
  providers: [SerieService],
})

export class SerieModule { }