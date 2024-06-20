import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comics } from 'src/comics/schemas/comics.schema';

export type CharactersSchemaDocument = HydratedDocument<Characters>;

@Schema()
export class Characters {
    @Prop({ required: true, unique: true })
    id: number;
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    thumbnail: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comics' }] })
    comics: Comics[];
}

export const CharactersSchema = SchemaFactory.createForClass(Characters);