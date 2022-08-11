import { Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { Request } from "supertest";
import { getManager, Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');
var converter = require('number-to-words');


@Injectable()
export class SalesInvoiceService {
    constructor(
        @InjectRepository(Salesinvoice001wb) private readonly salesinvoiceRepository: Repository<Salesinvoice001wb>,
        @InjectRepository(Custemer001wb) private readonly custemerRepository: Repository<Custemer001wb>,) {
    }
    async create(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {

        let custemer001wbs: Custemer001wb[] = [];

        for (let i = 0; i < salesInvoiceDTO.custemerSlno2?.length; i++) {
            const custemer001wb = new Custemer001wb();
            custemer001wb.custemerSlno = salesInvoiceDTO.custemerSlno2[i].custemerSlno;
            custemer001wb.custemername = salesInvoiceDTO.custemerSlno2[i].custemername;
            custemer001wb.prodescrip = salesInvoiceDTO.custemerSlno2[i].prodescrip;
            custemer001wb.qunty = salesInvoiceDTO.custemerSlno2[i].qunty;
            custemer001wb.uom = salesInvoiceDTO.custemerSlno2[i].uom;
            custemer001wb.unitrate = salesInvoiceDTO.custemerSlno2[i].unitrate;
            custemer001wb.totalamount = salesInvoiceDTO.custemerSlno2[i].totalamount;
            custemer001wb.insertUser = salesInvoiceDTO.insertUser;
            custemer001wb.insertDatetime = salesInvoiceDTO.insertDatetime;
            let orderitem = await this.custemerRepository.save(custemer001wb);
            custemer001wbs.push(orderitem);
        }

        if (custemer001wbs.length > 0) {
            const salesinvoice001wb = new Salesinvoice001wb();
            salesinvoice001wb.setProperties(salesInvoiceDTO);
            salesinvoice001wb.custemer001wbs = custemer001wbs;
            await this.salesinvoiceRepository.save(salesinvoice001wb);
            return salesinvoice001wb;
        }

    }



    async update(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
        const salesinvoice001wb = new Salesinvoice001wb();
        salesinvoice001wb.setProperties(salesInvoiceDTO);
        await this.salesinvoiceRepository.update({ slNo: salesinvoice001wb.slNo }, salesinvoice001wb);
        return salesinvoice001wb;

    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from salesinvoice001wb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }


    async findAll(): Promise<Salesinvoice001wb[]> {
        return await this.salesinvoiceRepository.find({ relations: ["custmrSlno2"] });
    }

    findOne(id: number): Promise<Salesinvoice001wb> {
        return this.salesinvoiceRepository.findOne(id);
    }
    async remove(id: string): Promise<void> {
        await this.salesinvoiceRepository.delete(id);
    }
    async downloadParamsPdf(id, response: Response) {
        let salesInvoice = await this.salesinvoiceRepository.find({
            relations: ["custemer001wbs", "custemer001wbs.custemerSlno2", "custmrSlno2"],
            where: { slNo: id },
        });


        let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })

        for (let i = 0; i < salesInvoice.length; i++) {
            custemers = salesInvoice[i].custemer001wbs
        }

        let totalAmount = 0;

        for (let i = 0; i < custemers.length; i++) {
            totalAmount = totalAmount + custemers[i].totalamount
        }

        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();



        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('SalesInvoicesInd.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',
            template: html,
            context: {
                salesInvoices: salesInvoice,
                custemers: custemers,
                totalAmount: totalAmount,
                Totalwords: Totalwords,
                // orderitemcode:orderitemcode

            },
            path: "./pdf/SalesInvoicesInd.pdf"
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
        let salesInvoice = await this.salesinvoiceRepository.find({
            relations: ["custemer001wbs", "custemer001wbs.custemerSlno2", "custmrSlno2"],

        });


        let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('SalesInvoices.html', 'utf8');
        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };




        for (let i = 0; i < salesInvoice.length; i++) {

            let totalAmount = 0;

            for (let j = 0; j < custemers.length; j++) {
                totalAmount = totalAmount + custemers[j].totalamount
            }

            let totalwords = converter.toWords(totalAmount);
            let Totalwords = totalwords.toUpperCase();



            var document = {
                type: 'file',
                template: html,
                context: {
                    salesInvoices: salesInvoice,
                    custemers: custemers,
                    totalAmount: totalAmount,
                    Totalwords: Totalwords,
                },
                path: "./pdf/SalesInvoices.pdf"
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
        let salesInvoice = await this.salesinvoiceRepository.find({
            relations: ["custemer001wbs", "custemer001wbs.custemerSlno2", "custmrSlno2"],

        });


        let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })
        let workbook = new excel.Workbook();
        for (let i = 0; i < salesInvoice.length; i++) {
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
            worksheet.getCell('A1:I1').value = "SALES INVOICE";
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


          
                    worksheet.mergeCells('A2:E3');
                    worksheet.getCell('A2:E3').value = {
                        'richText': [
                            { 'text': "Supplier Name :" + "\n\n" },
                            { 'font': { 'size': 11, }, 'text': "\n\n" +salesInvoice[i].custmrSlno2.custemername},
                        ]
                    };
                    worksheet.getCell('A2:E3').font = {
                        size: 11,
                        bold: true
                    };
                    worksheet.getCell('A2:E3').border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    worksheet.getCell('A2:E3').alignment = { vertical: 'top', horizontal: 'left' };
              

            worksheet.mergeCells('F2:G2');
            worksheet.getCell('F2:G2').value = {
                'richText': [
                    { 'text': "PO NO :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].pono },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].date },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].refno },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].otherRef },
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



         

                    worksheet.mergeCells('A4:E4');
                    worksheet.getCell('A4:E4').value = {
                        'richText': [
                            { 'text': "Consignee No (Ship To) :" + "\n\n" },
                            { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].custmrSlno2.consignee},
                        ]
                    };
                    worksheet.getCell('A4:E4').font = {
                        size: 11,
                        bold: true
                    };
                    worksheet.getCell('A4:E4').border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    worksheet.getCell('A4:E4').alignment = { vertical: 'top', horizontal: 'left' };



                    worksheet.mergeCells('A5:E5');
                    worksheet.getCell('A5:E5').value = {
                        'richText': [
                            { 'text': "Consignee No (Ship To) :" + "\n\n" },
                            { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].custmrSlno2.consignee},
                        ]
                    };
                    worksheet.getCell('A5:E5').font = {
                        size: 11,
                        bold: true
                    };
                    worksheet.getCell('A5:E5').border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    worksheet.getCell('A5:E5').alignment = { vertical: 'top', horizontal: 'left' };

             


            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = {
                'richText': [
                    { 'text': "Dispached Through :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].dispatchThrough },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].destination },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].termsDelivery },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].supplierFrom },
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


            for (let j = 0; j < salesInvoice[i].custemer001wbs.length; j++) {
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
                worksheet.getCell('B' + temp).value = salesInvoice[i].custemer001wbs[j].custemername;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('C' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('C' + temp).value = salesInvoice[i].hsn;



                        worksheet.mergeCells('D' + temp);
                        worksheet.getCell('D' + temp).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                        worksheet.getCell('D' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                        worksheet.getCell('D' + temp).value =  salesInvoice[i].custemer001wbs[j].custemerSlno2.procode;
                    


                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('E' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('E' + temp).value = salesInvoice[i].dueOn;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('F' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F' + temp).value = salesInvoice[i].custemer001wbs[j].qunty;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('G' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('G' + temp).value = salesInvoice[i].custemer001wbs[j].unitrate;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('H' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('H' + temp).value = salesInvoice[i].custemer001wbs[j].uom;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('I' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('I' + temp).value = salesInvoice[i].custemer001wbs[j].totalamount;


            }



            // }

            let purlength = salesInvoice[i].custemer001wbs.length + 8;

            let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })

            let totalAmount = 0;

            for (let i = 0; i < salesInvoice.length; i++) {
                custemers = salesInvoice[i].custemer001wbs
                for (let j = 0; j < custemers.length; j++) {
                    totalAmount = totalAmount + custemers[j].totalamount
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







    async downloadExcel1(id, response: Response) {

        let salesInvoice = await this.salesinvoiceRepository.find({
            relations: ["custemer001wbs", "custemer001wbs.custemerSlno2", "custmrSlno2"],
            where: { slNo: id },
        });
        let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })


        let workbook = new excel.Workbook();

        for (let i = 0; i < salesInvoice.length; i++) {


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

            // for (let i = 0; i < salesInvoice.length; i++) {

            worksheet.mergeCells('A1:I1');
            worksheet.getCell('A1:I1').value = "SALES INVOICE";
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

            worksheet.mergeCells('A2:E3');
            worksheet.getCell('A2:E3').value = {
                'richText': [
                    { 'text': "Supplier Name :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].custmrSlno2.custemername },
                ]
            };
            worksheet.getCell('A2:E3').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A2:E3').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A2:E3').alignment = { vertical: 'top', horizontal: 'left' };



            worksheet.mergeCells('F2:G2');
            worksheet.getCell('F2:G2').value = {
                'richText': [
                    { 'text': "PO NO :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].pono },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].date },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].refno },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].otherRef },
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





            worksheet.mergeCells('A4:E4');
            worksheet.getCell('A4:E4').value = {
                'richText': [
                    { 'text': "Consignee No (Ship To) :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].custmrSlno2.consignee },
                ]
            };
            worksheet.getCell('A4:E4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A4:E4').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A4:E4').alignment = { vertical: 'top', horizontal: 'left' };



            worksheet.mergeCells('A5:E5');
            worksheet.getCell('A5:E5').value = {
                'richText': [
                    { 'text': "Consignee No (Ship To) :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].custmrSlno2.consignee },
                ]
            };
            worksheet.getCell('A5:E5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A5:E5').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            worksheet.getCell('A5:E5').alignment = { vertical: 'top', horizontal: 'left' };


            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = {
                'richText': [
                    { 'text': "Dispached Through :" + "\n\n" },
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].dispatchThrough },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].destination },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].termsDelivery },
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
                    { 'font': { 'size': 11, }, 'text': "\n\n" + salesInvoice[i].supplierFrom },
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


            for (let j = 0; j < salesInvoice[i].custemer001wbs.length; j++) {
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
                worksheet.getCell('B' + temp).value = salesInvoice[i].custemer001wbs[j].custemername;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('C' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('C' + temp).value = salesInvoice[i].hsn;




                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('D' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('D' + temp).value = salesInvoice[i].custemer001wbs[j].custemerSlno2.procode;



                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('E' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('E' + temp).value = salesInvoice[i].dueOn;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('F' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('F' + temp).value = salesInvoice[i].custemer001wbs[j].qunty;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('G' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('G' + temp).value = salesInvoice[i].custemer001wbs[j].unitrate;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('H' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('H' + temp).value = salesInvoice[i].custemer001wbs[j].uom;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                worksheet.getCell('I' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('I' + temp).value = salesInvoice[i].custemer001wbs[j].totalamount;


            }



            // }

            let purlength = salesInvoice[i].custemer001wbs.length + 8;

            let custemers = await this.custemerRepository.find({ relations: ["custemerSlno2"] })
            var fs = require('fs');
            for (let i = 0; i < salesInvoice.length; i++) {
                custemers = salesInvoice[i].custemer001wbs
            }

            let totalAmount = 0;

            for (let j = 0; j < custemers.length; j++) {
                totalAmount = totalAmount + custemers[j].totalamount
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
