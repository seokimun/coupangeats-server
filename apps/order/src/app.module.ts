import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from 'joi';
import { OrderModule } from "./order/order.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
            DB_URL: Joi.string().required(),
            HTTP_PORT: Joi.number().required(),
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                uri: ConfigService.getOrThrow('DB_URL'),
            }),
            inject: [ConfigService],
        }),
        OrderModule
    ],
})
export class AppModule {}