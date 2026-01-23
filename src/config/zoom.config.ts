import { registerAs } from '@nestjs/config';
import { ZoomAppConfigOptions } from 'src/common';

export const zoomConfig = registerAs<ZoomAppConfigOptions>(
  'zoom',
  (): ZoomAppConfigOptions => ({
    ZOOM_API_KEY: process.env.ZOOM_API_KEY,
    ZOOM_API_SECRET: process.env.ZOOM_API_SECRET,
    ZOOM_ACCESS_TOKEN: process.env.ZOOM_ACCESS_TOKEN,
    REDIRECT_URL: process.env.REDIRECT_URL,
  }),
);
