import { PartialType } from '@nestjs/mapped-types';
import { CreateZoomMeetingDto } from './zoom.create.dto';

export class UpdateZoomMeetingDto extends PartialType(CreateZoomMeetingDto) {}
