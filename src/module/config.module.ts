import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, zoomConfig } from 'src/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load:[appConfig,zoomConfig],
            isGlobal: true,
        }),
    ]
})
export class Configmodule {}
