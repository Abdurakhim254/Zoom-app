import { ConfigService } from "@nestjs/config";
import { ZoomAppConfigOptions } from "src/common";

export function getZoomConfig(
    configService: ConfigService,
  ): ZoomAppConfigOptions {
    const config = configService.get<ZoomAppConfigOptions>('zoom');
  
    if (!config) {
      throw new Error('Zoom config is not defined');
    }
  
    return config;
  }