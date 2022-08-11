import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialinwardDTO } from "src/dto/Materialinward.dto";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { getManager, Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class MaterialinwardService {

    constructor(
        @InjectRepository(Materialinward001wb) private readonly MaterialinwardRepository: Repository<Materialinward001wb>,
        @InjectRepository(Materialreceiveditem001wb) private readonly materialreceiveditemRepository: Repository<Materialreceiveditem001wb>) {
    }

    async create(materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        let materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
        for (let i = 0; i < materialinwardDTO.metriealitems.length; i++) {
            const materialreceiveditem001wb = new Materialreceiveditem001wb();
            materialreceiveditem001wb.itemcode = materialinwardDTO.metriealitems[i].itemcode;
            materialreceiveditem001wb.itemname = materialinwardDTO.metriealitems[i].itemname;
            materialreceiveditem001wb.qunty = materialinwardDTO.metriealitems[i].qunty;
            materialreceiveditem001wb.unitrate = materialinwardDTO.metriealitems[i].unitrate;
            materialreceiveditem001wb.totalamount = materialinwardDTO.metriealitems[i].totalamount;
            materialreceiveditem001wb.acceptedQty = materialinwardDTO.metriealitems[i].acceptedQty;
            materialreceiveditem001wb.receivedQty = materialinwardDTO.metriealitems[i].receivedQty;
            materialreceiveditem001wb.rejectedQty = materialinwardDTO.metriealitems[i].rejectedQty;
            materialreceiveditem001wb.outstanding = materialinwardDTO.metriealitems[i].outstanding;
            materialreceiveditem001wb.insertUser = materialinwardDTO.insertUser;
            materialreceiveditem001wb.insertDatetime = materialinwardDTO.insertDatetime;
            let orderitem = await this.materialreceiveditemRepository.save(materialreceiveditem001wb);
            materialreceiveditem001wbs.push(orderitem);
        }

        if (materialreceiveditem001wbs.length > 0) {
            const materialinward001wb = new Materialinward001wb();
            materialinward001wb.setProperties(materialinwardDTO);
            materialinward001wb.materialreceiveditem001wbs = materialreceiveditem001wbs;
            await this.MaterialinwardRepository.save(materialinward001wb);
            return materialinward001wb;
        }
    }

    async update(materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        const materialinward001wb = new Materialinward001wb();
        materialinward001wb.setProperties(materialinwardDTO);
        await this.MaterialinwardRepository.update({ slNo: materialinward001wb.slNo }, materialinward001wb);
        return materialinward001wb;
    }

    async findAll(): Promise<Materialinward001wb[]> {
        return this.MaterialinwardRepository.find({
            relations: ["materialreceiveditem001wbs",],
        });
    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from materialinward001wb',['row']);
        var string=JSON.stringify(result);
        return string;
    }

    

    findOne(id: number): Promise<Materialinward001wb> {
        return this.MaterialinwardRepository.findOne({
            relations: ["materialreceiveditem001wbs",],
            where: { slNo: id },
        });
    }

    async remove(id: string): Promise<void> {
        await this.MaterialinwardRepository.delete(id);
    }


async downloadPdf(@Req() request: Request, @Res() response: Response) {        
        let materialinward = await this.MaterialinwardRepository.find();

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('materialinward.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                                
                
                materialinwardcheck: materialinward
             },
            path: "./pdf/materialinward.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "companydetails.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(@Req() request: Request, @Res() response: Response) {        
        let materialinward = await this.MaterialinwardRepository.find({relations: ["supfromSlno2"]});

        if (materialinward.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Material_Inward_Reports'); // creating worksheet
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
                { key: 'A', width: 30.0 },
                { key: 'B', width: 30.0 },
                { key: 'C', width: 45.0 },
                { key: 'D', width: 45.0 },
                { key: 'E', width: 45.0 },
                { key: 'F', width: 45.0 },
                { key: 'G', width: 45.0 },
                { key: 'H', width: 45.0 },
                { key: 'I', width: 45.0 },
                { key: 'J', width: 45.0 }];

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
            worksheet.mergeCells('C1:I2');
            worksheet.getCell('C1:I2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:I2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:I2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:I2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:I4');
            worksheet.getCell('C3:I4').value = "MATERIAL INWARD DETAILS";
            worksheet.getCell('C3:I4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:I4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('J1:J1');
            worksheet.getCell('J1:J1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('J1:J1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('J2:J2');
            worksheet.getCell('J2:J2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('J2:J2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('J3:J3');
            worksheet.getCell('J3:J3').value = "Rev. No. 00	";
            worksheet.getCell('J3:J3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('J4:J4');
            worksheet.getCell('J4:J4').value = "Rev Date :";
            worksheet.getCell('J4:J4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Date";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "D.C No";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "D.C Date";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Supplier Name";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "RM Description";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Advised Quantity";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Received Quantity";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Accepted Quantity";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
  
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Rejected Quantity";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };








            for (let i = 0; i < materialinward.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = materialinward[i].date;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = materialinward[i].dcNo;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = materialinward[i].dcDate;

                worksheet.mergeCells('E' + temp);
                // worksheet.getCell('E' + temp).value = materialinward[i].supfromSlno2.supplierFrom;

                worksheet.mergeCells('F' + temp);
                // worksheet.getCell('F' + temp).value = materialinward[i].rmdescrip;

                // worksheet.mergeCells('G' + temp);
                // worksheet.getCell('G' + temp).value = materialinward[i].advisedQty;

                // worksheet.mergeCells('H' + temp);
                // worksheet.getCell('H' + temp).value = materialinward[i].receivedQty;

                // worksheet.mergeCells('I' + temp);
                // worksheet.getCell('I' + temp).value = materialinward[i].acceptedQty;

                // worksheet.mergeCells('J' + temp);
                // worksheet.getCell('J' + temp).value = materialinward[i].rejectedQty;


            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}