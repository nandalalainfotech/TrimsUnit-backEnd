import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Repository } from "typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { Request } from "supertest";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";

var path = require('path');
const excel = require('exceljs');
var converter = require('number-to-words');


@Injectable()
export class SupplierQuotationService {
    constructor(
        @InjectRepository(Supplierquotation001wb) private readonly supplierAuditRepository: Repository<Supplierquotation001wb>,
        @InjectRepository(Supplierregistration001mb) private readonly supplierRegRepository: Repository<Supplierregistration001mb>,
        @InjectRepository(Orderitem001mb) private readonly orderItemRepository: Repository<Orderitem001mb>,
        @InjectRepository(Supplierquotationitems001wb) private readonly supplierquotationitemsRepository: Repository<Supplierquotationitems001wb>) {

    }



    async create( supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
       let supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
        for (let i = 0; i < supplierQuotationDTO.supplierItems.length; i++) {
            const supplierquotationitems001wb = new Supplierquotationitems001wb();
            supplierquotationitems001wb.itemcode = supplierQuotationDTO.supplierItems[i].itemcode;
            supplierquotationitems001wb.itemname = supplierQuotationDTO.supplierItems[i].itemname;
            supplierquotationitems001wb.qunty = supplierQuotationDTO.supplierItems[i].qunty;
            supplierquotationitems001wb.unitrate = supplierQuotationDTO.supplierItems[i].unitrate;
            supplierquotationitems001wb.totalamount = supplierQuotationDTO.supplierItems[i].totalamount;
            supplierquotationitems001wb.uom = supplierQuotationDTO.supplierItems[i].descrip;
            supplierquotationitems001wb.descrip = supplierQuotationDTO.supplierItems[i].descrip;
           

            supplierquotationitems001wb.cucode = supplierQuotationDTO.supplierItems[i].cucode;
            supplierquotationitems001wb.cuname = supplierQuotationDTO.supplierItems[i].cuname;
            supplierquotationitems001wb.cuqunty= supplierQuotationDTO.supplierItems[i].cuqunty;
            supplierquotationitems001wb.cunitrate = supplierQuotationDTO.supplierItems[i].cunitrate;
            supplierquotationitems001wb.cutotalamount = supplierQuotationDTO.supplierItems[i].cutotalamount;
            supplierquotationitems001wb.cuom = supplierQuotationDTO.supplierItems[i].cuom;
            supplierquotationitems001wb.cudescrip = supplierQuotationDTO.supplierItems[i].cudescrip;

            supplierquotationitems001wb.cptcode = supplierQuotationDTO.supplierItems[i].cptcode;
            supplierquotationitems001wb.cptname = supplierQuotationDTO.supplierItems[i].cptname;
            supplierquotationitems001wb.cptqunty = supplierQuotationDTO.supplierItems[i].cptqunty;
            supplierquotationitems001wb.cptunitrate = supplierQuotationDTO.supplierItems[i].cptunitrate;
            supplierquotationitems001wb.cpttotalamount = supplierQuotationDTO.supplierItems[i].cpttotalamount;
            supplierquotationitems001wb.cptuom = supplierQuotationDTO.supplierItems[i].cptdescrip;
            supplierquotationitems001wb.cptdescrip = supplierQuotationDTO.supplierItems[i].cptdescrip;
            supplierquotationitems001wb.hsn = supplierQuotationDTO.supplierItems[i].hsn;
            supplierquotationitems001wb.chsn = supplierQuotationDTO.supplierItems[i].chsn;
            supplierquotationitems001wb.cpthsn = supplierQuotationDTO.supplierItems[i].cpthsn;
            supplierquotationitems001wb.prthsn = supplierQuotationDTO.supplierItems[i].prthsn;
            supplierquotationitems001wb.prtcode = supplierQuotationDTO.supplierItems[i].prtcode;
            supplierquotationitems001wb.prtmname = supplierQuotationDTO.supplierItems[i].prtmname;
            supplierquotationitems001wb.prtqunty = supplierQuotationDTO.supplierItems[i].prtqunty;
            supplierquotationitems001wb.prtunitrate = supplierQuotationDTO.supplierItems[i].prtunitrate;
            supplierquotationitems001wb.prttotalamount = supplierQuotationDTO.supplierItems[i].prttotalamount;
            supplierquotationitems001wb.prtuom = supplierQuotationDTO.supplierItems[i].prtuom;
            supplierquotationitems001wb.prtdescrip = supplierQuotationDTO.supplierItems[i].prtdescrip;
            supplierquotationitems001wb.insertUser = supplierQuotationDTO.insertUser;
            supplierquotationitems001wb.insertDatetime = supplierQuotationDTO.insertDatetime;
            let orderitem = await this.supplierquotationitemsRepository.save(supplierquotationitems001wb);
            supplierquotationitems001wbs.push(orderitem);
        }

        if (supplierquotationitems001wbs.length > 0) {
           
            
            const supplierquotation001wb = new Supplierquotation001wb();
            supplierquotation001wb.setProperties(supplierQuotationDTO);
            // supplierquotation001wb.originalfilename = file.filename;
            console.log("supplierQuotationDTO",supplierQuotationDTO);
            supplierquotation001wb.supplierquotationitems001wbs = supplierquotationitems001wbs;
            await this.supplierAuditRepository.save(supplierquotation001wb);
            return supplierquotation001wb;
           
        }
    }
    async UpdateSupplierQuotation(approvel: any, pchaseslno: any, remarks: any): Promise<Supplierquotation001wb> {
        let supplierquotation001wb = new Supplierquotation001wb();
        supplierquotation001wb.status = approvel;
        supplierquotation001wb.remarks = remarks;
        supplierquotation001wb.updatedDatetime = new Date();
        await this.supplierAuditRepository.update({ slNo: pchaseslno }, supplierquotation001wb);
        return supplierquotation001wb;
    }
    async update( supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        const supplierquotation001wb = new Supplierquotation001wb();
        supplierquotation001wb.setProperties(supplierQuotationDTO);
        // supplierquotation001wb.originalfilename = file.filename;
        await this.supplierAuditRepository.update({ slNo: supplierquotation001wb.slNo },
            supplierquotation001wb);
        return supplierquotation001wb;
    }

    async findAll(): Promise<Supplierquotation001wb[]> {
        return this.supplierAuditRepository.find();
    }

    // async findAllBySupplierId(supregslno: number): Promise<Supplierquotation001wb[]> {
    //     return this.supplierAuditRepository.find({ relations: ["supregslno2"], where: { "supregslno": supregslno } });
    // }


    findOne(id: number): Promise<Supplierquotation001wb> {
        return this.supplierAuditRepository.findOne({
            relations: ["supplierquotationitems001wbs"],
            where: { slNo: id },
        });
    }

    async remove(id: string): Promise<void> {
        await this.supplierAuditRepository.delete(id);
    }

    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        let supplierQuotation = await this.supplierAuditRepository.find();
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('supplierQuotation.html', 'utf8');


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {


                supplierQuotationcheck: supplierQuotation
            },
            path: "./pdf/supplierQuotation.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "supplierQuotation.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }
    async downloadParamsPdf(id, response: Response) {
        let supplierQuotation = await this.supplierAuditRepository.find({
           where: { slNo: id }
        });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('supplierQuotation.html', 'utf8');


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {


                supplierQuotationcheck: supplierQuotation
            },
            path: "./pdf/supplierQuotation.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "supplierQuotation.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }

    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let supplierQuotation = await this.supplierAuditRepository.find();
        let suplierreg = await this.supplierRegRepository.find();
        let orderitem = await this.orderItemRepository.find();

        if (supplierQuotation.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('supplierQuotation_reports'); // creating worksheet
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15;
            worksheet.getRow(7).height = 15;
            worksheet.getRow(8).height = 15;
            worksheet.getRow(9).height = 15;
            worksheet.getRow(10).height = 15;
            worksheet.getRow(11).height = 15;
            worksheet.getRow(12).height = 15;
            worksheet.getRow(13).height = 15;
            worksheet.getRow(14).height = 15;
            worksheet.columns = [
                { key: 'A', width: 20.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 20.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 20.0 },
                { key: 'I', width: 20.0 },
                { key: 'J', width: 20.0 },
                { key: 'K', width: 45.0 },
                { key: 'L', width: 20.0 },
                { key: 'M', width: 20.0 },
                { key: 'N', width: 25.0 },
                { key: 'O', width: 25.0 },


            ];

            worksheet.columns.forEach((col) => {

                col.style.font = {
                    size: 10,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C1:M2');
            worksheet.getCell('C1:M2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:M2').fgColor = { argb: 'b03600' };
            worksheet.getCell('C1:M2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:M2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:M4');
            worksheet.getCell('C3:M4').value = "LIST OF SUPPLIER QUOTATION DETAILS";
            worksheet.getCell('C3:M4').fgColor = { argb: '00b050' };

            worksheet.getCell('C3:H4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('N3:N4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('N1:O1');
            worksheet.getCell('N1:O1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('N1:O1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N2:O2');
            worksheet.getCell('N2:O2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('N2:O2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N3:O3');
            worksheet.getCell('N3:O3').value = "Rev. No. 00	";
            worksheet.getCell('N3:O3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N4:O4');
            worksheet.getCell('N4:O4').value = "Rev Date :";
            worksheet.getCell('N4:O4').alignment = { vertical: 'left', horizontal: 'left' };



            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Supplier Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Address";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Quotation No";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Quotation Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Validity";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Item Code";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Item Name";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Description";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Quantity";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Price";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Contact Person Name";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Phone No";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "Mail Id";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('O5');
            worksheet.getCell('O5').value = "Terms and Conditions";
            worksheet.getCell('O5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < supplierQuotation.length; i++) {

                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                for (let i = 0; i < suplierreg.length; i++) {
                    if (supplierQuotation[i].supplierSlno == suplierreg[i].slNo) {
                        worksheet.mergeCells('B' + temp);
                        worksheet.getCell('B' + temp).value = suplierreg[i].supplierName;

                    }
                }

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = supplierQuotation[i].address;
                worksheet.mergeCells('D' + temp);
                // worksheet.getCell('D' + temp).value = supplierQuotation[i].quotationNo;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = supplierQuotation[i].quotationDate;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = supplierQuotation[i].validity

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = orderitem[i].itemcode;

                // worksheet.mergeCells('H' + temp);
                // worksheet.getCell('H' + temp).value = supplierQuotation[i].itemname;

                // worksheet.mergeCells('I' + temp);
                // worksheet.getCell('I' + temp).value = supplierQuotation[i].description;

                // worksheet.mergeCells('J' + temp);
                // worksheet.getCell('J' + temp).value = supplierQuotation[i].quantity;

                // worksheet.mergeCells('K' + temp);
                // worksheet.getCell('K' + temp).value = supplierQuotation[i].price;

                // worksheet.mergeCells('L' + temp);
                // worksheet.getCell('L' + temp).value = supplierQuotation[i].personName;

                // worksheet.mergeCells('M' + temp);
                // worksheet.getCell('M' + temp).value = supplierQuotation[i].number;

                // worksheet.mergeCells('N' + temp);
                // worksheet.getCell('N' + temp).value = supplierQuotation[i].mailId;

                worksheet.mergeCells('O' + temp);
                worksheet.getCell('O' + temp).value = supplierQuotation[i].termsCondition;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }


      async downloadExcel1(id, response: Response) {
        let supplierQuotation = await this.supplierAuditRepository.find({
            where: { slNo: id }
        });
        let suplierreg = await this.supplierRegRepository.find();
        let orderitem = await this.orderItemRepository.find();

        if (supplierQuotation.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('supplierQuotation_reports'); // creating worksheet
            worksheet.getRow(5).height = 15;
            worksheet.getRow(6).height = 15;
            worksheet.getRow(7).height = 15;
            worksheet.getRow(8).height = 15;
            worksheet.getRow(9).height = 15;
            worksheet.getRow(10).height = 15;
            worksheet.getRow(11).height = 15;
            worksheet.getRow(12).height = 15;
            worksheet.getRow(13).height = 15;
            worksheet.getRow(14).height = 15;
            worksheet.columns = [
                { key: 'A', width: 20.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 20.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 20.0 },
                { key: 'I', width: 20.0 },
                { key: 'J', width: 20.0 },
                { key: 'K', width: 45.0 },
                { key: 'L', width: 20.0 },
                { key: 'M', width: 20.0 },
                { key: 'N', width: 25.0 },
                { key: 'N', width: 25.0 },


            ];

            worksheet.columns.forEach((col) => {

                col.style.font = {
                    size: 10,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C1:M2');
            worksheet.getCell('C1:M2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:M2').fgColor = { argb: 'b03600' };
            worksheet.getCell('C1:M2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:M2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:M4');
            worksheet.getCell('C3:M4').value = "LIST OF SUPPLIER QUOTATION DETAILS";
            worksheet.getCell('C3:M4').fgColor = { argb: '00b050' };

            worksheet.getCell('C3:H4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('N3:N4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('N1:O1');
            worksheet.getCell('N1:O1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('N1:O1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N2:O2');
            worksheet.getCell('N2:O2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('N2:O2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N3:O3');
            worksheet.getCell('N3:O3').value = "Rev. No. 00	";
            worksheet.getCell('N3:O3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N4:O4');
            worksheet.getCell('N4:O4').value = "Rev Date :";
            worksheet.getCell('N4:O4').alignment = { vertical: 'left', horizontal: 'left' };



            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Supplier Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Address";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Quotation No";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Quotation Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Validity";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Item Code";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Item Name";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Description";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Quantity";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Price";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Contact Person Name";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Phone No";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "Mail Id";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('O5');
            worksheet.getCell('O5').value = "Terms and Conditions";
            worksheet.getCell('O5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < supplierQuotation.length; i++) {

                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                // for (let i = 0; i < suplierreg.length; i++) {
                //     if (supplierQuotation[i].supplierSlno != suplierreg[i].slNo) {
                //         worksheet.mergeCells('B' + temp);
                //         worksheet.getCell('B' + temp).value = suplierreg[i].supplierName;

                //     }
                // }

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = supplierQuotation[i].address;
                worksheet.mergeCells('D' + temp);
                // worksheet.getCell('D' + temp).value = supplierQuotation[i].quotationNo;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = supplierQuotation[i].quotationDate;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = supplierQuotation[i].validity

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = orderitem[i].itemcode;

                // worksheet.mergeCells('H' + temp);
                // worksheet.getCell('H' + temp).value = supplierQuotation[i].itemname;

                // worksheet.mergeCells('I' + temp);
                // worksheet.getCell('I' + temp).value = supplierQuotation[i].description;

                // worksheet.mergeCells('J' + temp);
                // worksheet.getCell('J' + temp).value = supplierQuotation[i].quantity;

                // worksheet.mergeCells('K' + temp);
                // worksheet.getCell('K' + temp).value = supplierQuotation[i].price;

                // worksheet.mergeCells('L' + temp);
                // worksheet.getCell('L' + temp).value = supplierQuotation[i].personName;

                // worksheet.mergeCells('M' + temp);
                // worksheet.getCell('M' + temp).value = supplierQuotation[i].number;

                // worksheet.mergeCells('N' + temp);
                // worksheet.getCell('N' + temp).value = supplierQuotation[i].mailId;

                worksheet.mergeCells('O' + temp);
                worksheet.getCell('O' + temp).value = supplierQuotation[i].termsCondition;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }

}