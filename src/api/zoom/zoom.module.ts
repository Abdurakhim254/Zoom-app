import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Zoom, ZoomSchema } from 'src/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zoom.name, schema: ZoomSchema }]),
  ],
  exports: [ZoomService],
  providers: [ZoomService],
})
export class ZoomModule {}
