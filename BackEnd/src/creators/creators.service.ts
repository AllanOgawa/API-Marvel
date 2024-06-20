import { Injectable } from '@nestjs/common';
import { Creators } from './schemas/creators.schema';
import { Model } from 'mongoose';
import { CreatorsDto } from './dtos/creators.Dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comics } from 'src/comics/schemas/comics.schema';


@Injectable()
export class CreatorsService {
    constructor(@InjectModel(Creators.name) private creatorsModel: Model<Creators>) { }

    @InjectModel(Comics.name) private comicsModel: Model<Comics>;

    async findAll(): Promise<Creators[]> {
        return await this.creatorsModel.find().exec();
    }

    async find(id: number): Promise<Creators> {
        return await this.creatorsModel.findOne({ id: id });
    }

    async findComicsOfCreator(id: number): Promise<Comics[]> {
        try {
            const creator = await this.creatorsModel.findOne(({ id: id }));
            const comics = [];

            for (let i in creator.comics) {
                comics.push(await this.comicsModel.findOne({ _id: creator.comics[i] }));
            }

            return comics;

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async create(creator: CreatorsDto): Promise<Creators> {
        return await this.creatorsModel.create(creator);
    }

    async update(id: number, creator: CreatorsDto): Promise<Creators> {
        return await this.creatorsModel.findOneAndUpdate({ id: id }, creator, { new: true });
    }

    async delete(id: number): Promise<Creators> {
        return await this.creatorsModel.findOneAndDelete({ id: id })
    }
}
