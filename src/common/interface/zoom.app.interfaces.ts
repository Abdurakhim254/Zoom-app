export interface ZoomAppConfigOptions{
    ZOOM_API_KEY: string;
    ZOOM_API_SECRET: string;
    ZOOM_ACCESS_TOKEN: string;
    REDIRECT_URL:string
}


export interface Settings {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: 0 | 1 | 2;
    audio: 'both' | 'telephony' | 'voip';
    auto_recording: 'local' | 'cloud' | 'none';
  }

export type ZoomMeetingSettings=Partial<Settings>