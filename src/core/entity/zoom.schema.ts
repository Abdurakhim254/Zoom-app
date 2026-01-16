import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ZoomDocument = Zoom & Document;

@Schema()
export class Zoom {
    @Prop()
    uuid: string;
    @Prop()
    id: number;
    @Prop()
    host_id: string;
    @Prop()
    topic: string;
    @Prop()
    type: number;
    @Prop()
    start_time: string;
    @Prop()
    duration: number;
    @Prop()
    timezone: string;
    @Prop()
    created_at: string;
    @Prop()
    join_url: string;
}

export const ZoomSchema = SchemaFactory.createForClass(Zoom);