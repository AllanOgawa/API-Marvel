import { Injectable } from '@nestjs/common';
import { Series } from './schemas/serie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SerieService {
  constructor(@InjectModel(Series.name) private serieModel: Model<Series>) { }

  async findAll(): Promise<Series[]> {
    return await this.serieModel.find().exec();
  }
}

