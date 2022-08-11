import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentDTO } from "src/dto/Payment.dto";
import { Payment001wb } from "src/entity/Payment001wb";
import { Repository } from "typeorm";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Response } from "express";

var path = require('path');
const excel = require('exceljs');
var converter = require('number-to-words');

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment001wb) private readonly paymentRepository: Repository<Payment001wb>) {
    }

    async create(paymentDTO: PaymentDTO): Promise<Payment001wb> {
        const payment001wb = new Payment001wb();
        payment001wb.setProperties(paymentDTO);
        return this.paymentRepository.save(payment001wb);
    }

    async update(paymentDTO: PaymentDTO): Promise<Payment001wb> {
        const payment001wb = new Payment001wb();
        payment001wb.setProperties(paymentDTO);
        await this.paymentRepository.update({ slNo: payment001wb.slNo }, payment001wb);
        return payment001wb;
    }

    async findAll(): Promise<Payment001wb[]> {
        return await this.paymentRepository.find({ relations: ["saleorderSlno2", "saleorderSlno2.porderSlno2"] });
    }

    findOne(id: number): Promise<Payment001wb> {
        return this.paymentRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.paymentRepository.delete(slNo);
    }


    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        let payment = await this.paymentRepository.find({
            relations: ["saleorderSlno2", "saleorderSlno2.porderSlno2"],
        });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('payment.html', 'utf8');


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',
            template: html,
            context: {
                paymentcheck: payment
            },
            path: "./pdf/payment.pdf"
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "payment.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }

    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let payment = await this.paymentRepository.find
            ({ relations: ["saleorderSlno2", "saleorderSlno2.porderSlno2"], });

        if (payment.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('payment_reports'); // creating worksheet
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
            worksheet.mergeCells('C1:J2');
            worksheet.getCell('C1:J2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:J2').fgColor = { argb: 'b03600' };
            worksheet.getCell('C1:J2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:J2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:J4');
            worksheet.getCell('C3:J4').value = "LIST OF PAYMENT DETAILS";
            worksheet.getCell('C3:J4').fgColor = { argb: '00b050' };

            worksheet.getCell('C3:H4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('K3:K4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('K1:K1');
            worksheet.getCell('K1:K1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('K1:K1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K2:K2');
            worksheet.getCell('K2:K2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('K2:K2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K3:K3');
            worksheet.getCell('K3:K3').value = "Rev. No. 00	";
            worksheet.getCell('K3:K3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K4:K4');
            worksheet.getCell('K4:K4').value = "Rev Date :";
            worksheet.getCell('K4:K4').alignment = { vertical: 'left', horizontal: 'left' };



            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Invoice No";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Invoice Amount";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Payment Date";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Payment Status";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Due Date";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "GST No";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "GST Percentage";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "GST Amount";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Total Amount";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Remarks";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < payment.length; i++) {



                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = payment[i].saleorderSlno2.invoiceNo;

                worksheet.mergeCells('C' + temp);
                // worksheet.getCell('C' + temp).value = payment[i].saleorderSlno2.porderSlno2.amount;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = payment[i].payDate;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = payment[i].payStatus;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = payment[i].dueDate;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = payment[i].gstNo;


                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = payment[i].gstPercent;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = payment[i].gstAmount;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = payment[i].totalAmount;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = payment[i].remarks;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }

}