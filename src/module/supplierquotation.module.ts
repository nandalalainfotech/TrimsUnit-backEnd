import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { SupplierQuotationController } from "src/controller/supplierquotation.controller";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { SupplierQuotationService } from "src/service/supplierquotation.service";


@Module({

    imports: [TypeOrmModule.forFeature([Supplierquotation001wb,Supplierregistration001mb,Orderitem001mb,Supplierquotationitems001wb]),
    MulterModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            return {
                storage: diskStorage({
                    destination: async (req, file, cb) => {
                        const path: string = configService.get('STATICPATH');
                        return cb(null, path);
                    },
                    filename: (req, file, cb) => {
                        return cb(null, `${Date.now()}_${file.originalname}`);
                    }
                })
            }
        },
    }),],
  
    providers: [SupplierQuotationService],
    controllers: [SupplierQuotationController],
})
export class SupplierQuotationModule { }