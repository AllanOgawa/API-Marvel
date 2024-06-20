import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comics } from 'src/comics/schemas/comics.schema';

export type CreatorsSchemaDocument = HydratedDocument<Creators>;

@Schema()
export class Creators {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    fullName: string;
    @Prop()
    thumbnail: string;
    @Prop()
    role: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comics' }] })
    comics: Comics[];
}

export const CreatorsSchema = SchemaFactory.createForClass(Creators);