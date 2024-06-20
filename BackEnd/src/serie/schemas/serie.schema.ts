import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SerieSchemaDocument = HydratedDocument<Series>;

@Schema()
export class Series {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    startYear: number;
    @Prop()
    endYear: number;
    @Prop()
    thumbnail: string;
}

export const SerieSchema = SchemaFactory.createForClass(Series);