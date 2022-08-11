import { Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { OrderItemwbDTO } from "src/dto/orderitem-wb.dto";
import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Request } from "supertest";
import { getManager, Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');
var converter = require('number-to-words');


@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(Purchaseorder001wb) private readonly PurchaseorderRepository: Repository<Purchaseorder001wb>,
        @InjectRepository(Orderitem001wb) private readonly orderItemRepository: Repository<Orderitem001wb>,
        @InjectRepository(Companydetails001mb) private readonly companyRepository: Repository<Companydetails001mb>,
        @InjectRepository(Consignee001mb) private readonly consigneeRepository: Repository<Consignee001mb>,
        @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>) {
    }
    async create(purchaseorderpDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        let orderitem001wbs: Orderitem001wb[] = [];
        for (let i = 0; i < purchaseorderpDTO.orderitemSlno2?.length; i++) {
            const orderitem001wb = new Orderitem001wb();
            orderitem001wb.itemcode = purchaseorderpDTO.orderitemSlno2[i].itemcode;
            orderitem001wb.itemname = purchaseorderpDTO.orderitemSlno2[i].itemname;
            orderitem001wb.qunty = purchaseorderpDTO.orderitemSlno2[i].qunty;
            orderitem001wb.unitrate = purchaseorderpDTO.orderitemSlno2[i].unitrate;
            orderitem001wb.totalamount = purchaseorderpDTO.orderitemSlno2[i].totalamount;
            orderitem001wb.uom = purchaseorderpDTO.orderitemSlno2[i].descrip;
            orderitem001wb.hsn = purchaseorderpDTO.orderitemSlno2[i].hsn;
            orderitem001wb.descrip = purchaseorderpDTO.orderitemSlno2[i].descrip;
           

            orderitem001wb.cucode = purchaseorderpDTO.orderitemSlno2[i].cucode;
            orderitem001wb.cuname = purchaseorderpDTO.orderitemSlno2[i].cuname;
            orderitem001wb.cuqunty= purchaseorderpDTO.orderitemSlno2[i].cuqunty;
            orderitem001wb.cunitrate = purchaseorderpDTO.orderitemSlno2[i].cunitrate;
            orderitem001wb.cutotalamount = purchaseorderpDTO.orderitemSlno2[i].cutotalamount;
            orderitem001wb.cuom = purchaseorderpDTO.orderitemSlno2[i].cuom;
            orderitem001wb.chsn = purchaseorderpDTO.orderitemSlno2[i].chsn;
            orderitem001wb.cudescrip = purchaseorderpDTO.orderitemSlno2[i].cudescrip;

            orderitem001wb.cptcode = purchaseorderpDTO.orderitemSlno2[i].cptcode;
            orderitem001wb.cptname = purchaseorderpDTO.orderitemSlno2[i].cptname;
            orderitem001wb.cptqunty = purchaseorderpDTO.orderitemSlno2[i].cptqunty;
            orderitem001wb.cptunitrate = purchaseorderpDTO.orderitemSlno2[i].cptunitrate;
            orderitem001wb.cpttotalamount = purchaseorderpDTO.orderitemSlno2[i].cpttotalamount;
            orderitem001wb.cptuom = purchaseorderpDTO.orderitemSlno2[i].cptdescrip;
            orderitem001wb.cpthsn = purchaseorderpDTO.orderitemSlno2[i].cpthsn;
            orderitem001wb.cptdescrip = purchaseorderpDTO.orderitemSlno2[i].cptdescrip;

            orderitem001wb.prtcode = purchaseorderpDTO.orderitemSlno2[i].prtcode;
            orderitem001wb.prtmname = purchaseorderpDTO.orderitemSlno2[i].prtmname;
            orderitem001wb.prtqunty = purchaseorderpDTO.orderitemSlno2[i].prtqunty;
            orderitem001wb.prtunitrate = purchaseorderpDTO.orderitemSlno2[i].prtunitrate;
            orderitem001wb.prttotalamount = purchaseorderpDTO.orderitemSlno2[i].prttotalamount;
            orderitem001wb.prtuom = purchaseorderpDTO.orderitemSlno2[i].prtuom;
            orderitem001wb.prthsn = purchaseorderpDTO.orderitemSlno2[i].prthsn;
            orderitem001wb.prtdescrip = purchaseorderpDTO.orderitemSlno2[i].prtdescrip;
            orderitem001wb.insertUser = purchaseorderpDTO.insertUser;
            orderitem001wb.insertDatetime = purchaseorderpDTO.insertDatetime;
            let orderitem = await this.orderItemRepository.save(orderitem001wb);
            orderitem001wbs.push(orderitem);
        }

        if (orderitem001wbs.length > 0) {
            const purchaseorder001wb = new Purchaseorder001wb();
            purchaseorder001wb.setProperties(purchaseorderpDTO);
            purchaseorder001wb.orderitem001wbs = orderitem001wbs;
            await this.PurchaseorderRepository.save(purchaseorder001wb);
            return purchaseorder001wb;
        }
    }



    async update(purchaseorderpDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        const purchaseorder001wb = new Purchaseorder001wb();
        purchaseorder001wb.setProperties(purchaseorderpDTO);
        await this.PurchaseorderRepository.update({ slNo: purchaseorder001wb.slNo }, purchaseorder001wb);
        return purchaseorder001wb;

    }

    async UpdatePO(approvel: any, pchaseslno: any, remarks: any): Promise<Purchaseorder001wb> {
        let purchaseorder001wb = new Purchaseorder001wb();
        purchaseorder001wb.status = approvel;
        purchaseorder001wb.remarks = remarks;
        purchaseorder001wb.updatedDatetime = new Date();
        await this.PurchaseorderRepository.update({ slNo: pchaseslno }, purchaseorder001wb);
        return purchaseorder001wb;
    }

    async findAllByMetrialId(purchseSlno: number): Promise<Purchaseorder001wb> {
        return this.PurchaseorderRepository.findOne(purchseSlno);
    }
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from Purchaseorder001wb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }


    async findAll(): Promise<Purchaseorder001wb[]> {
        return await this.PurchaseorderRepository.find();
    }

    findOne(id: number): Promise<Purchaseorder001wb> {
        return this.PurchaseorderRepository.findOne({
            relations: ["orderitem001wbs", ],
            where: { slNo: id },
        });
    }
    findById(purchseId: any): Promise<Purchaseorder001wb> {
        console.log("purchseId",purchseId);
        return this.PurchaseorderRepository.findOne({where: { slNo: purchseId },
            relations: ["orderitem001wbs", ]});
    }

    async remove(id: string): Promise<void> {
        await this.PurchaseorderRepository.delete(id);
    }

    async downloadParamsPdf(id:any, response: Response) {
        let purOrders = await this.PurchaseorderRepository.find({
            // relations: ["orderitem001wbs", "orderitem001wbs.orderslno2", "companySlno2", "consigneeSlno2"],
            where: { slNo: id },
        });


        let orderitems = await this.orderItemRepository.find({ })

        for (let i = 0; i < purOrders.length; i++) {
            orderitems = purOrders[i].orderitem001wbs
        }

        let totalAmount = 0;

        for (let i = 0; i < orderitems.length; i++) {
            totalAmount = totalAmount + orderitems[i].totalamount
        }

        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();



        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('purchaseOrder.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',
            template: html,
            context: {
                purchaseOrder: purOrders,
                orderitems: orderitems,
                totalAmount: totalAmount,
                Totalwords: Totalwords,
                // orderitemcode:orderitemcode

            },
            path: "./pdf/purchaseOrder.pdf"
        };





        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "PurchaseOrder.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }

    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        let purOrders = await this.PurchaseorderRepository.find({
            relations: ["orderitem001wbs", "companySlno2", "consigneeSlno2"]
        });
        let company = await this.companyRepository.find();
        let consignee = await this.consigneeRepository.find();
        let orderitem = await this.orderItemsRepository.find();
        let orderitems = await this.orderItemRepository.find()
        // { relations: ["orderslno2"] }
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('purchaseOreders.html', 'utf8');
        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };




        for (let i = 0; i < purOrders.length; i++) {

            let totalAmount = 0;

            for (let j = 0; j < orderitems.length; j++) {
                totalAmount = totalAmount + orderitems[j].totalamount
            }

            let totalwords = converter.toWords(totalAmount);
            let Totalwords = totalwords.toUpperCase();



            var document = {
                type: 'file',
                template: html,
                context: {
                    purchaseOrder: purOrders,
                    orderitems: orderitems,
                    totalAmount: totalAmount,
                    Totalwords: Totalwords,
                },
                path: "./pdf/purchaseOreders.pdf"
            };
        }
        if (document === null) {
            return null;
        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "PurchaseOrder.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }


    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let purOrders = await this.PurchaseorderRepository.find({ relations: ["orderitem001wbs", "companySlno2", "consigneeSlno2"] });
        let consignee = await this.consigneeRepository.find();
        let company = await this.companyRepository.find();
        let orderitem = await this.orderItemsRepository.find();
        let orderitems = await this.orderItemRepository.find()
        let workbook = new excel.Workbook();
        for (let i = 0; i < purOrders.length; i++) {
            let worksheet = workbook.addWorksheet('Statutory_Reports' + i); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';
            worksheet.getRow(1).height = 40;
            worksheet.getRow(2).height = 40;
            worksheet.getRow(3).height = 40;
            worksheet.getRow(4).height = 40;
            worksheet.getRow(5).height = 60;
            worksheet.getRow(6).height = 60;
            worksheet.getRow(7).height = 60;
            worksheet.getRow(8).height = 60;
            worksheet.getRow(9).height = 60;
            worksheet.getRow(10).height = 60;
            worksheet.getRow(11).height = 60;
            worksheet.getRow(12).height = 60;
            worksheet.getRow(13).height = 60;
            worksheet.getRow(14).height = 80;
            worksheet.columns = [{ key: 'A', width: 20.0 },
            { key: 'B', width: 20.0 },
            { key: 'C', width: 20.0 },
            { key: 'D', width: 20.0 },
            { key: 'E', width: 20.0 },
            { key: 'F', width: 20.0 },
            { key: 'G', width: 20.0 },
            { key: 'H', width: 20.0 },
            { key: 'I', width: 20.0 },
            { key: 'J', width: 20.0 },
            { key: 'K', width: 20.0 },
            { key: 'L', width: 20.0 },
            { key: 'M', width: 20.0 },
            { key: 'N', width: 20.0 },
            { key: 'P', width: 20.0 },
            { key: 'Q', width: 20.0 },
            { key: 'R', width: 20.0 },
            { key: 'S', width: 20.0 },
            { key: 'T', width: 20.0 },


            ];
            worksheet.mergeCells('A1:I1');
            worksheet.getCell('A1:I1').value = "PURCHASE ORDER";
            worksheet.getCell('A1:I1').font = {
                size: 16,
                bold: true
            };
            worksheet.getCell('A1:I1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A1:I1').alignment = { vertical: 'middle', horizontal: 'center' };


            // for (let j = 0; j < company.length; j++) {

            //     if (purOrders[i]. == company[j].slNo) {
            //         worksheet.mergeCells('A2:E3');
            //         worksheet.getCell('A2:E3').value = {
            //             'richText': [
            //                 { 'text': "Supplier Name :" + "\n\n" },
            //                 { 'font': { 'size': 11, }, 'text': "\n\n" + company[j].company },
            //             ]
            //         };
            //         worksheet.getCell('A2:E3').font = {
            //             size: 11,
            //             bold: true
            //         };
            //         worksheet.getCell('A2:E3').border = {
            //             top: { style: 'thin' },
            //             left: { style: 'thin' },
            //             bottom: { style: 'thin' },
            //             right: { style: 'thin' }
            //         };
            //         worksheet.getCell('A2:E3').alignment = { vertical: 'top', horizontal: 'left' };
            //     }


            // }


            worksheet.mergeCells('F2:G2');
            worksheet.getCell('F2:G2').value = {
                'richText': [
                    { 'text': "PO NO :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].pono },
                ]
            };
            worksheet.getCell('F2:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F2:G2').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F2:G2').alignment = { vertical: 'top', horizontal: 'left' };



            worksheet.mergeCells('H2:I2');
            worksheet.getCell('H2:I2').value = {
                'richText': [
                    { 'text': "Date :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].date },
                ]
            };
            worksheet.getCell('H2:I2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H2:I2').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H2:I2').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('F3:G3');
            worksheet.getCell('F3:G3').value = {
                'richText': [
                    { 'text': "Reference No :" + "\n\n" },
                    // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].refno },
                ]
            };
            worksheet.getCell('F3:G3').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F3:G3').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F3:G3').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('H3:I3');
            worksheet.getCell('H3:I3').value = {
                'richText': [
                    { 'text': "Other Reference :" + "\n\n" },
                    // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].otherRef },
                ]
            };
            worksheet.getCell('H3:I3').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H3:I3').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H3:I3').alignment = { vertical: 'top', horizontal: 'left' };



            for (let K = 0; K < consignee.length; K++) {

            //     if (purOrders[i].consigneeSlno == consignee[K].slNo) {

            //         worksheet.mergeCells('A4:E4');
            //         worksheet.getCell('A4:E4').value = {
            //             'richText': [
            //                 { 'text': "Consignee No (Ship To) :" + "\n\n" },
            //                 { 'font': { 'size': 11, }, 'text': "\n\n" + consignee[K].consignee },
            //             ]
            //         };
            //         worksheet.getCell('A4:E4').font = {
            //             size: 11,
            //             bold: true
            //         };
            //         worksheet.getCell('A4:E4').border = {
            //             top: { style: 'thin' },
            //             left: { style: 'thin' },
            //             bottom: { style: 'thin' },
            //             right: { style: 'thin' }
            //         };
            //         worksheet.getCell('A4:E4').alignment = { vertical: 'top', horizontal: 'left' };



            //         worksheet.mergeCells('A5:E5');
            //         worksheet.getCell('A5:E5').value = {
            //             'richText': [
            //                 { 'text': "Consignee No (Ship To) :" + "\n\n" },
            //                 { 'font': { 'size': 11, }, 'text': "\n\n" + consignee[K].consignee },
            //             ]
            //         };
            //         worksheet.getCell('A5:E5').font = {
            //             size: 11,
            //             bold: true
            //         };
            //         worksheet.getCell('A5:E5').border = {
            //             top: { style: 'thin' },
            //             left: { style: 'thin' },
            //             bottom: { style: 'thin' },
            //             right: { style: 'thin' }
            //         };
            //         worksheet.getCell('A5:E5').alignment = { vertical: 'top', horizontal: 'left' };

            //     }

            // }


            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = {
                'richText': [
                    { 'text': "Dispached Through :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].dispatchThrough },
                ]
            };
            worksheet.getCell('F4:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F4:G4').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F4:G4').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('H4:I4');
            worksheet.getCell('H4:I4').value = {
                'richText': [
                    { 'text': "Destination :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].destination },
                ]
            };
            worksheet.getCell('H4:I4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H4:I4').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H4:I4').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('F5:I6');
            worksheet.getCell('F5:I6').value = {
                'richText': [
                    { 'text': "Terms Of Delivery :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].termsDelivery },
                ]
            };
            worksheet.getCell('F5:I6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F5:I6').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F5:I6').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('A6:E6');
            worksheet.getCell('A6:E6').value = {
                'richText': [
                    { 'text': "Supplier (Bill From) :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].supplierFrom },
                ]
            };
            worksheet.getCell('A6:E6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A6:E6').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A6:E6').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('A7');
            worksheet.getCell('A7').value = "SL: No";
            worksheet.getCell('A7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('B7');
            worksheet.getCell('B7').value = "Description of Goods";
            worksheet.getCell('B7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('B7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('C7');
            worksheet.getCell('C7').value = "HSN/SAC";
            worksheet.getCell('C7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('C7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('D7');
            worksheet.getCell('D7').value = "Part No";
            worksheet.getCell('D7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('D7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('D7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('E7');
            worksheet.getCell('E7').value = "Due On";
            worksheet.getCell('E7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('E7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('E7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('F7');
            worksheet.getCell('F7').value = "Quantity";
            worksheet.getCell('F7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('G7');
            worksheet.getCell('G7').value = "Rate";
            worksheet.getCell('G7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('G7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('G7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('H7');
            worksheet.getCell('H7').value = "Uom";
            worksheet.getCell('H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('I7');
            worksheet.getCell('I7').value = "Amount";
            worksheet.getCell('I7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('I7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('I7').alignment = { vertical: 'top', horizontal: 'left' };


            for (let j = 0; j < purOrders[i].orderitem001wbs.length; j++) {
                let temp = j + 8;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('A' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('B' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('B' + temp).value = purOrders[i].orderitem001wbs[j].itemname;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('C' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                // worksheet.getCell('C' + temp).value = purOrders[i].hsn;



                // for (let k = 0; k < orderitem.length; k++) {
                //     if (purOrders[i].orderitem001wbs[j].orderslno == orderitem[k].slNo) {
                //         worksheet.mergeCells('D' + temp);
                //         worksheet.getCell('D' + temp).border = {
                //             top: { style: 'thin' },
                //             left: { style: 'thin' },
                //             bottom: { style: 'thin' },
                //             right: { style: 'thin' }
                //         };
                //         worksheet.getCell('D' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                //         worksheet.getCell('D' + temp).value = orderitem[k].itemcode;
                //     }
                // }



                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('E' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('E' + temp).value = purOrders[i].dueOn;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('F' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F' + temp).value = purOrders[i].orderitem001wbs[j].qunty;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('G' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('G' + temp).value = purOrders[i].orderitem001wbs[j].unitrate;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('H' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('H' + temp).value = purOrders[i].orderitem001wbs[j].uom;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('I' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('I' + temp).value = purOrders[i].orderitem001wbs[j].totalamount;


            }



            // }

            let purlength = purOrders[i].orderitem001wbs.length + 8;

            let orderitems = await this.orderItemRepository.find()
            // { relations: ["orderslno2"] }

            let totalAmount = 0;

            for (let i = 0; i < purOrders.length; i++) {
                orderitems = purOrders[i].orderitem001wbs
                for (let j = 0; j < orderitems.length; j++) {
                    totalAmount = totalAmount + orderitems[j].totalamount
                }
            }



            let totalwords = converter.toWords(totalAmount);
            let Totalwords = totalwords.toUpperCase();



            worksheet.mergeCells('B' + purlength);
            worksheet.getCell('B' + purlength).value = "Total";
            worksheet.getCell('B' + purlength).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            worksheet.getCell('B' + purlength).alignment = { vertical: 'middle', horizontal: 'right' };
            worksheet.getCell('B' + purlength).font = {
                size: 11,
            };

            worksheet.mergeCells('I' + purlength);
            worksheet.getCell('I' + purlength).value = totalAmount;
            worksheet.getCell('I' + purlength).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('I' + purlength).alignment = { vertical: 'middle', horizontal: 'right' };


            let orderlength = purlength + 1;
            worksheet.getRow(orderlength).height = 150;
            let order = 'A' + orderlength + ':' + 'I' + orderlength;

            worksheet.mergeCells(order);
            worksheet.getCell(order).value = "Terms and Conditions" + Totalwords;
            worksheet.getCell(order).alignment = { vertical: 'top', horizontal: 'left' };
            worksheet.getCell(order).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                // bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            let signlength = orderlength + 1;
            worksheet.getRow(signlength).height = 60;
            let sign = 'A' + signlength + ':' + 'E' + signlength;
            worksheet.mergeCells(sign);
            worksheet.getCell(sign).border = {
                // top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            let signs = 'F' + signlength + ':' + 'I' + signlength;
            worksheet.mergeCells(signs);
            worksheet.getCell(signs).value = "Authorised Signatory";
            worksheet.getCell(signs).alignment = { vertical: 'bottom', horizontal: 'right' };
            worksheet.getCell(signs).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

        }

        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }


    // ----------------------------individual-excel---------------------------



    }



    async downloadExcel1(id, response: Response) {

        let purOrders = await this.PurchaseorderRepository.find({
            relations: ["orderitem001wbs"],
            where: { slNo: id },
        });
        let orderitem = await this.orderItemsRepository.find();
        let orderitems = await this.orderItemRepository.find({ relations: ["purchaseorder001wbs"] })




        let company = await this.companyRepository.find();


        let consignee = await this.consigneeRepository.find();


        let workbook = new excel.Workbook();

        for (let i = 0; i < purOrders.length; i++) {


            let worksheet = workbook.addWorksheet('Statutory_Reports');

            worksheet.getRow(1).height = 40;
            worksheet.getRow(2).height = 40;
            worksheet.getRow(3).height = 40;
            worksheet.getRow(4).height = 40;
            worksheet.getRow(5).height = 40;
            worksheet.getRow(6).height = 50;
            worksheet.getRow(7).height = 20;
            worksheet.getRow(8).height = 20;
            worksheet.getRow(9).height = 20;
            worksheet.getRow(10).height = 20;
            worksheet.getRow(11).height = 20;
            worksheet.getRow(12).height = 20;
            worksheet.getRow(13).height = 20;
            worksheet.getRow(14).height = 20;
            worksheet.columns = [
                { key: 'A', width: 30.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 15.0 },
                { key: 'D', width: 15.0 },
                { key: 'E', width: 15.0 },
                { key: 'F', width: 15.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 15.0 },
                { key: 'I', width: 15.0 }
            ];

            // for (let i = 0; i < purOrders.length; i++) {

            worksheet.mergeCells('A1:I1');
            worksheet.getCell('A1:I1').value = "PURCHASE ORDER";
            worksheet.getCell('A1:I1').font = {
                size: 16,
                bold: true
            };
            worksheet.getCell('A1:I1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A1:I1').alignment = { vertical: 'middle', horizontal: 'center' };


            // for (let j = 0; j < company.length; j++) {

            //     if (purOrders[i].companySlno == company[j].slNo) {
            //         worksheet.mergeCells('A2:E3');
            //         worksheet.getCell('A2:E3').value = {
            //             'richText': [
            //                 { 'text': "Supplier Name :" + "\n\n" },
            //                 { 'font': { 'size': 11, }, 'text': "\n\n" + company[j].company },
            //             ]
            //         };
            //         worksheet.getCell('A2:E3').font = {
            //             size: 11,
            //             bold: true
            //         };
            //         worksheet.getCell('A2:E3').border = {
            //             top: { style: 'thin' },
            //             left: { style: 'thin' },
            //             bottom: { style: 'thin' },
            //             right: { style: 'thin' }
            //         };
            //         worksheet.getCell('A2:E3').alignment = { vertical: 'top', horizontal: 'left' };
            //     }


            // }


            worksheet.mergeCells('F2:G2');
            worksheet.getCell('F2:G2').value = {
                'richText': [
                    { 'text': "PO NO :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].pono },
                ]
            };
            worksheet.getCell('F2:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F2:G2').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F2:G2').alignment = { vertical: 'top', horizontal: 'left' };



            worksheet.mergeCells('H2:I2');
            worksheet.getCell('H2:I2').value = {
                'richText': [
                    { 'text': "Date :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].date },
                ]
            };
            worksheet.getCell('H2:I2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H2:I2').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H2:I2').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('F3:G3');
            worksheet.getCell('F3:G3').value = {
                'richText': [
                    { 'text': "Reference No :" + "\n\n" },
                    // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].refno },
                ]
            };
            worksheet.getCell('F3:G3').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F3:G3').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F3:G3').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('H3:I3');
            worksheet.getCell('H3:I3').value = {
                'richText': [
                    { 'text': "Other Reference :" + "\n\n" },
                    // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].otherRef },
                ]
            };
            worksheet.getCell('H3:I3').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H3:I3').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H3:I3').alignment = { vertical: 'top', horizontal: 'left' };



            for (let K = 0; K < consignee.length; K++) {

                // if (purOrders[i].consigneeSlno == consignee[K].slNo) {

                //     worksheet.mergeCells('A4:E4');
                //     worksheet.getCell('A4:E4').value = {
                //         'richText': [
                //             { 'text': "Consignee No (Ship To) :" + "\n\n" },
                //             { 'font': { 'size': 11, }, 'text': "\n\n" + consignee[K].consignee },
                //         ]
                //     };
                //     worksheet.getCell('A4:E4').font = {
                //         size: 11,
                //         bold: true
                //     };
                //     worksheet.getCell('A4:E4').border = {
                //         top: { style: 'thin' },
                //         left: { style: 'thin' },
                //         bottom: { style: 'thin' },
                //         right: { style: 'thin' }
                //     };
                //     worksheet.getCell('A4:E4').alignment = { vertical: 'top', horizontal: 'left' };



                //     worksheet.mergeCells('A5:E5');
                //     worksheet.getCell('A5:E5').value = {
                //         'richText': [
                //             { 'text': "Consignee No (Ship To) :" + "\n\n" },
                //             { 'font': { 'size': 11, }, 'text': "\n\n" + consignee[K].consignee },
                //         ]
                //     };
                //     worksheet.getCell('A5:E5').font = {
                //         size: 11,
                //         bold: true
                //     };
                //     worksheet.getCell('A5:E5').border = {
                //         top: { style: 'thin' },
                //         left: { style: 'thin' },
                //         bottom: { style: 'thin' },
                //         right: { style: 'thin' }
                //     };
                //     worksheet.getCell('A5:E5').alignment = { vertical: 'top', horizontal: 'left' };

                // }

            }


            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = {
                'richText': [
                    { 'text': "Dispached Through :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].dispatchThrough },
                ]
            };
            worksheet.getCell('F4:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F4:G4').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F4:G4').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('H4:I4');
            worksheet.getCell('H4:I4').value = {
                'richText': [
                    { 'text': "Destination :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].destination },
                ]
            };
            worksheet.getCell('H4:I4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H4:I4').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H4:I4').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('F5:I6');
            worksheet.getCell('F5:I6').value = {
                'richText': [
                    { 'text': "Terms Of Delivery :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].termsDelivery },
                ]
            };
            worksheet.getCell('F5:I6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F5:I6').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F5:I6').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('A6:E6');
            worksheet.getCell('A6:E6').value = {
                'richText': [
                    { 'text': "Supplier (Bill From) :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i].supplierFrom },
                ]
            };
            worksheet.getCell('A6:E6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A6:E6').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A6:E6').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('A7');
            worksheet.getCell('A7').value = "SL: No";
            worksheet.getCell('A7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('B7');
            worksheet.getCell('B7').value = "Description of Goods";
            worksheet.getCell('B7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('B7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('C7');
            worksheet.getCell('C7').value = "HSN/SAC";
            worksheet.getCell('C7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('C7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('D7');
            worksheet.getCell('D7').value = "Part No";
            worksheet.getCell('D7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('D7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('D7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('E7');
            worksheet.getCell('E7').value = "Due On";
            worksheet.getCell('E7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('E7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('E7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('F7');
            worksheet.getCell('F7').value = "Quantity";
            worksheet.getCell('F7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('F7').alignment = { vertical: 'top', horizontal: 'left' };

            worksheet.mergeCells('G7');
            worksheet.getCell('G7').value = "Rate";
            worksheet.getCell('G7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('G7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('G7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('H7');
            worksheet.getCell('H7').value = "Uom";
            worksheet.getCell('H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('H7').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('I7');
            worksheet.getCell('I7').value = "Amount";
            worksheet.getCell('I7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('I7').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('I7').alignment = { vertical: 'top', horizontal: 'left' };


            for (let j = 0; j < purOrders[i].orderitem001wbs.length; j++) {
                let temp = j + 8;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('A' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('B' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('B' + temp).value = purOrders[i].orderitem001wbs[j].itemname;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('C' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                // worksheet.getCell('C' + temp).value = purOrders[i].hsn;



                for (let k = 0; k < orderitem.length; k++) {
                    // if (purOrders[i].orderitem001wbs[j].orderslno == orderitem[k].slNo) {
                    //     worksheet.mergeCells('D' + temp);
                    //     worksheet.getCell('D' + temp).border = {
                    //         top: { style: 'thin' },
                    //         left: { style: 'thin' },
                    //         bottom: { style: 'thin' },
                    //         right: { style: 'thin' }
                    //     };
                    //     worksheet.getCell('D' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                    //     worksheet.getCell('D' + temp).value = orderitem[k].itemcode;
                    // }
                }



                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('E' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('E' + temp).value = purOrders[i].dueOn;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('F' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F' + temp).value = purOrders[i].orderitem001wbs[j].qunty;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('G' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('G' + temp).value = purOrders[i].orderitem001wbs[j].unitrate;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('H' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('H' + temp).value = purOrders[i].orderitem001wbs[j].uom;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('I' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('I' + temp).value = purOrders[i].orderitem001wbs[j].totalamount;


            }



            // }

            let purlength = purOrders[i].orderitem001wbs.length + 8;

            let orderitems = await this.orderItemRepository.find()
            // { relations: ["orderslno2"] }
            for (let i = 0; i < purOrders.length; i++) {
                orderitems = purOrders[i].orderitem001wbs
            }

            let totalAmount = 0;

            for (let j = 0; j < orderitems.length; j++) {
                totalAmount = totalAmount + orderitems[j].totalamount
            }

            let totalwords = converter.toWords(totalAmount);
            let Totalwords = totalwords.toUpperCase();



            worksheet.mergeCells('B' + purlength);
            worksheet.getCell('B' + purlength).value = "Total";
            worksheet.getCell('B' + purlength).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            worksheet.getCell('B' + purlength).alignment = { vertical: 'middle', horizontal: 'right' };
            worksheet.getCell('B' + purlength).font = {
                size: 11,
            };

            worksheet.mergeCells('I' + purlength);
            worksheet.getCell('I' + purlength).value = totalAmount;
            worksheet.getCell('I' + purlength).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('I' + purlength).alignment = { vertical: 'middle', horizontal: 'right' };


            let orderlength = purlength + 1;
            worksheet.getRow(orderlength).height = 150;
            let order = 'A' + orderlength + ':' + 'I' + orderlength;

            worksheet.mergeCells(order);
            worksheet.getCell(order).value = {
                'richText': [
                    { 'font': { 'size': 11, }, 'text': "\n\n" + Totalwords },
                    { 'text': "Terms and Conditions" + "\n\n" },

                ]
            };
            worksheet.getCell(order).alignment = { vertical: 'top', horizontal: 'left' };
            worksheet.getCell(order).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                // bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            let signlength = orderlength + 1;
            worksheet.getRow(signlength).height = 60;
            let sign = 'A' + signlength + ':' + 'E' + signlength;
            worksheet.mergeCells(sign);
            worksheet.getCell(sign).border = {
                // top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            let signs = 'F' + signlength + ':' + 'I' + signlength;
            worksheet.mergeCells(signs);
            worksheet.getCell(signs).value = "Authorised Signatory";
            worksheet.getCell(signs).alignment = { vertical: 'bottom', horizontal: 'right' };
            worksheet.getCell(signs).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

        }

        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });

    }

}




