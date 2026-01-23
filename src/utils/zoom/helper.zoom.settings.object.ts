import { ZoomMeetingSettings } from 'src/common';

export const settings: ZoomMeetingSettings = {
  host_video: true,
  participant_video: true,
  join_before_host: true,
  mute_upon_entry: true,
  watermark: false,
  use_pmi: false,
  approval_type: 0,
  audio: 'both',
  auto_recording: 'local',
};
