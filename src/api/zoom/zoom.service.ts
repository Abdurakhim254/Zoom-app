import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateZoomMeetingDto, UpdateZoomMeetingDto } from 'src/common';
import { Zoom } from 'src/core';

@Injectable()
export class ZoomService {
  constructor(
    @InjectModel(Zoom.name)
    private readonly zoomModel: Model<Zoom>,
  ) {}

  async create(dto: CreateZoomMeetingDto): Promise<Zoom> {
    const meeting = await this.zoomModel.create(dto);
    return meeting;
  }
  async findAll(): Promise<Zoom[]> {
    return this.zoomModel.find().select('-settings').sort({ created_at: -1 }).exec();
    }
  async findOneByMeetingId(meetingId: number): Promise<Zoom> {
    const meeting = await this.zoomModel.findOne({ id: meetingId }).exec();

    if (!meeting) {
      throw new NotFoundException('Zoom meeting not found');
    }

    return meeting;
  }

  async update(
    meetingId: number,
    dto: UpdateZoomMeetingDto,
  ): Promise<Zoom> {
    const meeting = await this.zoomModel.findOneAndUpdate(
      { id: meetingId },
      dto,
      { new: true },
    );

    if (!meeting) {
      throw new NotFoundException('Zoom meeting not found');
    }

    return meeting;
  }

  async remove(meetingId: number): Promise<{ message: string }> {
    const result = await this.zoomModel.findOneAndDelete({
      id: meetingId,
    });

    if (!result) {
      throw new NotFoundException('Zoom meeting not found');
    }

    return { message: 'Zoom meeting deleted successfully' };
  }
}
