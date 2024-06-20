import { Injectable } from '@nestjs/common';
import { Characters } from './schemas/characters.schema';
import { Model } from 'mongoose';
import { CharactersDto } from './dtos/characters.Dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comics } from 'src/comics/schemas/comics.schema';

@Injectable()
export class CharactersService {
    constructor(@InjectModel(Characters.name) private charactersModel: Model<Characters>) { }

    @InjectModel(Comics.name) private comicsModel: Model<Comics>;

    async findAll(): Promise<Characters[]> {
        return await this.charactersModel.find().exec();
    }

    async getTotalCharacters(): Promise<any> {
        try {
            const charactes = await this.charactersModel.find().exec();
            return charactes.length;

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async find(id: number): Promise<Characters> {
        return await this.charactersModel.findOne({ id: id });
    }

    async findComicsOfCharacter(id: number): Promise<Comics[]> {
        try {
            const character = await this.charactersModel.findOne(({ id: id }));
            const comics = [];

            for (let i in character.comics) {
                comics.push(await this.comicsModel.findOne({ _id: character.comics[i] }));
            }

            return comics;

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async create(character: CharactersDto): Promise<Characters> {
        return await this.charactersModel.create(character);
    }

    async update(id: number, character: CharactersDto): Promise<Characters> {
        return await this.charactersModel.findOneAndUpdate({ id: id }, character, { new: true });
    }

    async delete(id: number): Promise<Characters> {
        return await this.charactersModel.findOneAndDelete({ id: id })
    }
}
