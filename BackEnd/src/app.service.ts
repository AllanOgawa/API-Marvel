import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comics } from './comics/schemas/comics.schema';
import { Creators } from './creators/schemas/creators.schema';
import { Characters } from './characters/schemas/characters.schema';
import { Series } from './serie/schemas/serie.schema';
import { CreateSerieDto } from './serie/dtos/serie.dto';
import { ComicsDto } from './comics/dtos/comics.Dto';
import { CharactersDto } from './characters/dtos/characters.Dto';
import { CreatorsDto } from './creators/dtos/creators.Dto';

const apikey = "";
const hash = "";
const link = 'http://gateway.marvel.com/v1/public/series/489';
const authentication = '?&ts=1&apikey=' + apikey + '&hash=' + hash;

@Injectable()
export class AppService {
    @InjectModel(Comics.name) private comicsModel: Model<Comics>;
    @InjectModel(Creators.name) private creatorsModel: Model<Creators>;
    @InjectModel(Characters.name) private charactersModel: Model<Characters>;
    @InjectModel(Series.name) private serieModel: Model<Series>;

    async fetchApi(): Promise<any> {
        try {
            const ret = { serie: {}, comics: {}, creators: {}, characters: {} };

            const responseSerie = await axios.get(link + authentication);
            const series = responseSerie.data.data.results[0];
            ret.serie = await this.createSerie(series);

            const responseComics = await axios.get(link + '/comics' + authentication);
            const comics = responseComics.data.data.results;
            ret.comics = await this.createComics(comics);

            const responseCreators = await axios.get(link + '/creators' + authentication);
            const creators = responseCreators.data.data.results;
            ret.creators = await this.createCreators(creators, comics);

            const responseCharacters = await axios.get(link + '/characters' + authentication);
            const characters = responseCharacters.data.data.results;
            ret.characters = await this.createCharacters(characters, comics);

            return ret;

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async createSerie(data: any): Promise<Series[]> {
        try {
            const serie = new CreateSerieDto();
            serie.id = data.id;
            serie.title = data.title;
            serie.description = data.description;
            serie.endYear = data.endYear;
            serie.startYear = data.startYear;
            serie.thumbnail = data.thumbnail.path + "." + data.thumbnail.extension;

            if (!await this.serieModel.findOne({ id: serie.id }).exec())
                await this.serieModel.create(serie);

            return await this.serieModel.find().exec();

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async createComics(data: any): Promise<Comics[]> {
        try {
            for (let i in data) {
                const comic = new ComicsDto();
                comic.id = data[i].id;
                comic.issueNumber = data[i].issueNumber;
                comic.title = data[i].title;
                comic.description = (data[i].textObjects.length > 0) ? data[i].textObjects[0].text : "";
                comic.thumbnail = data[i].thumbnail.path + "." + data[i].thumbnail.extension;
                comic.onsaleDate = data[i].dates[0].date;
                comic.price = data[i].prices[0].price;

                if (!await this.comicsModel.findOne({ issueNumber: comic.issueNumber }).exec())
                    await this.comicsModel.create(comic);
            }
            return await this.comicsModel.find().exec();
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async createCreators(creators: any, comics: any): Promise<Creators[]> {
        try {
            for (let i in creators) {

                let creatorComics = [];
                let role = "";

                for (let idx in comics) {
                    const appears = comics[idx].creators.items.filter(val => val.name == creators[i].fullName);
                    if ((comics[idx].creators.available > 0) && (appears.length > 0)) {
                        creatorComics.push(await this.comicsModel.findOne({ id: comics[idx].id }));
                        role = appears[0].role;
                    }
                }
                const creator = new CreatorsDto();
                creator.id = creators[i].id;
                creator.role = role;
                creator.firstName = creators[i].firstName;
                creator.lastName = creators[i].lastName;
                creator.fullName = creators[i].fullName;
                creator.thumbnail = creators[i].thumbnail.path + "." + creators[i].thumbnail.extension;
                creator.comics = creatorComics;

                if (!await this.creatorsModel.findOne({ id: creator.id }).exec())
                    await this.creatorsModel.create(creator);
            }
            return await this.creatorsModel.find().exec();
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async createCharacters(characters: any, comics: any): Promise<Characters[]> {
        try {
            for (let i in characters) {

                let characterComics = [];

                for (let idx in comics) {
                    if ((comics[idx].characters.available > 0) &&
                        (comics[idx].characters.items.filter(val => val.name == characters[i].name).length > 0)) {
                        characterComics.push(await this.comicsModel.findOne({ id: comics[idx].id }));
                    }
                }

                const character = new CharactersDto();
                character.id = characters[i].id;
                character.name = characters[i].name;
                character.description = characters[i].description;
                character.thumbnail = characters[i].thumbnail.path + "." + characters[i].thumbnail.extension;
                character.comics = characterComics;

                if (!await this.charactersModel.findOne({ id: character.id }).exec())
                    await this.charactersModel.create(character);
            }
            return await this.charactersModel.find().exec();

        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

}
