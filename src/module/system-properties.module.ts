import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemPropertiesController } from 'src/controller/system-properties.controller';
import { Systemproperties001mb } from 'src/entity/Systemproperties001mb';
import { SystemPropertiesService } from 'src/service/system-properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Systemproperties001mb])],
  providers: [SystemPropertiesService],
  controllers: [SystemPropertiesController],
})
export class SystemPropertiesModule {}
