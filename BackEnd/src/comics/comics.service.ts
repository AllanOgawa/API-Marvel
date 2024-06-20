import { Injectable } from '@nestjs/common';
import { Comics } from './schemas/comics.schema';
import { Model } from 'mongoose';
import { ComicsDto } from './dtos/comics.Dto';
import { InjectModel } from '@nestjs/mongoose';
import { Characters } from 'src/characters/schemas/characters.schema';
import { Creators } from 'src/creators/schemas/creators.schema';

@Injectable()
export class ComicsService {
    constructor(@InjectModel(Comics.name) private comicsModel: Model<Comics>) { }

    @InjectModel(Characters.name) private charactersModel: Model<Characters>;
    @InjectModel(Creators.name) private creatorsModel: Model<Creators>;

    async findAll(): Promise<Comics[]> {
        return await this.comicsModel.find().exec();
    }

    async getTotalComics(): Promise<any> {
        try {
            const comics = await this.comicsModel.find().exec();
            return comics.length;

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async find(issueNumber: number): Promise<Comics> {
        return await this.comicsModel.findOne({ issueNumber: issueNumber });
    }

    async findCharacterOfComics(issueNumber: number): Promise<Characters[]> {
        try {
            const comic = await this.comicsModel.findOne(({ issueNumber: issueNumber }));

            return await this.charactersModel.find(({ comics: comic._id }));

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async findCreatorsOfComics(issueNumber: number): Promise<Creators[]> {
        try {
            const comic = await this.comicsModel.findOne(({ issueNumber: issueNumber }));

            return await this.creatorsModel.find(({ comics: comic._id }));

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async create(comic: ComicsDto): Promise<Comics> {
        return await this.comicsModel.create(comic);
    }

    async update(issueNumber: number, comic: ComicsDto): Promise<Comics> {
        return await this.comicsModel.findOneAndUpdate({ issueNumber: issueNumber }, comic, { new: true });
    }

    async delete(issueNumber: number): Promise<Comics> {
        return await this.comicsModel.findOneAndDelete({ issueNumber: issueNumber })
    }

}
