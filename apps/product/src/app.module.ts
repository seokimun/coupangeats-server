import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            DB_URL: Joi.string().required(),
            HTTP_PORT: Joi.number().required(),
          })
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.getOrThrow('DB_URL'),
            autoLoadEntities: true,
            synchronize: true,
          }),
          inject: [ConfigService]
        }),
    ProductModule,
  ],
})
export class AppModule {}
