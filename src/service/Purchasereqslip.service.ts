import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { getManager, Repository } from "typeorm";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Response } from "express";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";

var path = require('path');
const excel = require('exceljs');
var converter = require('number-to-words');


@Injectable()
export class PurchasereqslipService {

    constructor(
        @InjectRepository(Purchasereqslip001wb) private readonly PurchasereqslipRepository: Repository<Purchasereqslip001wb>,
        @InjectRepository(Purchasereqitem001wb) private readonly purchasereqslipitemRepository: Repository<Purchasereqitem001wb>) {

    }

    async create(purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
        let purchasereqitem001wbs: Purchasereqitem001wb[] = [];
        for (let i = 0; i < purchasereqslipDTO.purchasereqitem.length; i++) {
            const purchasereqitem001wb = new Purchasereqitem001wb();
            purchasereqitem001wb.orderslno = purchasereqslipDTO.purchasereqitem[i].orderslno;
            purchasereqitem001wb.itemname = purchasereqslipDTO.purchasereqitem[i].itemname;
            purchasereqitem001wb.qunty = purchasereqslipDTO.purchasereqitem[i].qunty;
            purchasereqitem001wb.unitrate = purchasereqslipDTO.purchasereqitem[i].unitrate;
            purchasereqitem001wb.totalamount = purchasereqslipDTO.purchasereqitem[i].totalamount;
            purchasereqitem001wb.uom = purchasereqslipDTO.purchasereqitem[i].descrip;
            purchasereqitem001wb.hsn = purchasereqslipDTO.purchasereqitem[i].hsn;
            purchasereqitem001wb.descrip = purchasereqslipDTO.purchasereqitem[i].descrip;
           

          


            purchasereqitem001wb.cucode = purchasereqslipDTO.purchasereqitem[i].cucode;
            purchasereqitem001wb.cuname = purchasereqslipDTO.purchasereqitem[i].cuname;
            purchasereqitem001wb.cuqunty= purchasereqslipDTO.purchasereqitem[i].cuqunty;
            purchasereqitem001wb.cunitrate = purchasereqslipDTO.purchasereqitem[i].cunitrate;
            purchasereqitem001wb.cutotalamount = purchasereqslipDTO.purchasereqitem[i].cutotalamount;
            purchasereqitem001wb.cuom = purchasereqslipDTO.purchasereqitem[i].cuom;
            purchasereqitem001wb.chsn = purchasereqslipDTO.purchasereqitem[i].chsn;
            purchasereqitem001wb.cudescrip = purchasereqslipDTO.purchasereqitem[i].cudescrip;

            purchasereqitem001wb.cptcode = purchasereqslipDTO.purchasereqitem[i].cptcode;
            purchasereqitem001wb.cptname = purchasereqslipDTO.purchasereqitem[i].cptname;
            purchasereqitem001wb.cptqunty = purchasereqslipDTO.purchasereqitem[i].cptqunty;
            purchasereqitem001wb.cptunitrate = purchasereqslipDTO.purchasereqitem[i].cptunitrate;
            purchasereqitem001wb.cpttotalamount = purchasereqslipDTO.purchasereqitem[i].cpttotalamount;
            purchasereqitem001wb.cptuom = purchasereqslipDTO.purchasereqitem[i].cptdescrip;
            purchasereqitem001wb.cpthsn = purchasereqslipDTO.purchasereqitem[i].cpthsn;
            purchasereqitem001wb.cptdescrip = purchasereqslipDTO.purchasereqitem[i].cptdescrip;

            purchasereqitem001wb.prtcode = purchasereqslipDTO.purchasereqitem[i].prtcode;
            purchasereqitem001wb.prtmname = purchasereqslipDTO.purchasereqitem[i].prtmname;
            purchasereqitem001wb.prtqunty = purchasereqslipDTO.purchasereqitem[i].prtqunty;
            purchasereqitem001wb.prtunitrate = purchasereqslipDTO.purchasereqitem[i].prtunitrate;
            purchasereqitem001wb.prttotalamount = purchasereqslipDTO.purchasereqitem[i].prttotalamount;
            purchasereqitem001wb.prtuom = purchasereqslipDTO.purchasereqitem[i].prtuom;
            purchasereqitem001wb.prthsn = purchasereqslipDTO.purchasereqitem[i].prthsn;
            purchasereqitem001wb.prtdescrip = purchasereqslipDTO.purchasereqitem[i].prtdescrip;
            purchasereqitem001wb.insertUser = purchasereqslipDTO.insertUser;
            purchasereqitem001wb.insertDatetime = purchasereqslipDTO.insertDatetime;
            let orderitem = await this.purchasereqslipitemRepository.save(purchasereqitem001wb);
            purchasereqitem001wbs.push(orderitem);
        }

        if (purchasereqitem001wbs.length > 0) {
            const purchasereqslip001wb = new Purchasereqslip001wb();
            purchasereqslip001wb.setProperties(purchasereqslipDTO);
            purchasereqslip001wb.purchasereqitem001wbs = purchasereqitem001wbs;
            await this.PurchasereqslipRepository.save(purchasereqslip001wb);
            return purchasereqslip001wb;
        }
    }

    // async create(purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
    //     const purchasereqslip001wb = new Purchasereqslip001wb();
    //     purchasereqslip001wb.setProperties(purchasereqslipDTO);
    //     return this.PurchasereqslipRepository.save(purchasereqslip001wb);
    // }

    async submitStatusUpdate(): Promise<Purchasereqslip001wb> {
        const purchasereqslip001wb = new Purchasereqslip001wb();
        purchasereqslip001wb.status = "Approval Request Submitted";
        purchasereqslip001wb.updatedDatetime = new Date();
        // await this.PurchasereqslipRepository.submitStatusUpdate();
        return purchasereqslip001wb;
    }

    async approvalStatusupdate(): Promise<Purchasereqslip001wb> {
        const purchasereqslip001wb = new Purchasereqslip001wb();
        return purchasereqslip001wb;
    }

    async updatereqslip(approvel: any, pchaseslno: any, remarks: any): Promise<Purchasereqslip001wb> {
        let purchasereqslip001wb = new Purchasereqslip001wb();
        purchasereqslip001wb.status = approvel;
        purchasereqslip001wb.remarks = remarks;
        purchasereqslip001wb.updatedDatetime = new Date();
        await this.PurchasereqslipRepository.update({ slNo: pchaseslno }, purchasereqslip001wb);
        return purchasereqslip001wb;
    }

    async update(purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
        const purchasereqslip001wb = new Purchasereqslip001wb();
        purchasereqslip001wb.setProperties(purchasereqslipDTO);
        await this.PurchasereqslipRepository.update({ slNo: purchasereqslip001wb.slNo }, purchasereqslip001wb);
        return purchasereqslip001wb;
    }

    async findAll(): Promise<Purchasereqslip001wb[]> {
        return await this.PurchasereqslipRepository.find({});
    }

    async findAllbyBreakDownId(): Promise<Purchasereqslip001wb[]> {
        return this.PurchasereqslipRepository.find();
    }

    findOne(id: number): Promise<Purchasereqslip001wb> {
        return this.PurchasereqslipRepository.findOne({
            relations: ["purchasereqitem001wbs"],
            where: { slNo: id },
        });
    }
    async remove(slNo: number): Promise<void> {
        await this.PurchasereqslipRepository.delete(slNo);
    }
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from Purchasereqslip001wb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }
    async downloadIDPdf(id: any, response: Response) {
      let purchaslip = await this.PurchasereqslipRepository.find({
        where: { slNo: id },
        relations: ["purchasereqitem001wbs"],
      });
  
      let purchasereqslipitems = await this.purchasereqslipitemRepository.find();
  
     
      
  
      for (let i = 0; i < purchaslip.length; i++) {
        if (purchaslip[i].purchasereqitem001wbs[i].cucode) {
          console.log("1", purchasereqslipitems[i].cucode);
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
        } else if (purchaslip[i].purchasereqitem001wbs[i].cptcode) {
          console.log("2", purchasereqslipitems[i].cptcode);
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
        } else if (purchaslip[i].purchasereqitem001wbs[i].prtcode) {
          console.log("3", purchasereqslipitems[i].prtcode);
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
        } else {
          console.log("4", purchasereqslipitems[i].orderslno);
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
        }
      }
  
      let totalAmount = 0;
  
      for (let i = 0; i < purchasereqslipitems.length; i++) {
        totalAmount = totalAmount + purchasereqslipitems[i].totalamount;
      }
  
      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();
  
      var fs = require("fs");
      var pdf = require("dynamic-html-pdf");
      var html = fs.readFileSync("purchaslip.html", "utf8");
  
      pdf.registerHelper('ifCond', function (purchasereqslipitems) {
        console.log("purchasereqslipitems", purchasereqslipitems);
        
        if (purchasereqslipitems == "cptcode") {
          console.log("cptcode", this.cptcode); 
            return purchasereqslipitems;
        }
        else if (purchasereqslipitems == "cucode") {
          console.log("cptcode", this.cucode); 
            return purchasereqslipitems;
        }
        else if (purchasereqslipitems == "prtcode") {
          console.log("cptcode", this.prtcode); 
          return purchasereqslipitems;
        }
        else {
          return purchasereqslipitems;
        }
      })
  
      var options = {
        format: "A3",
        orientation: "landscape",
        border: "10mm",
      };
  
      var document = {
        type: "file", // 'file' or 'buffer'
        template: html,
        context: {
          purchaslipcheck: purchaslip,
          Purchasereqslipitems: purchasereqslipitems,
          totalAmount: totalAmount,
          Totalwords: Totalwords,
        },
        path: "./pdf/purchaslip.pdf", // it is not required if type is buffer
      };
  
      if (document === null) {
        return null;
      } else {
        pdf
          .create(document, options)
          .then((pathRes) => {
            const filestream = createReadStream(pathRes.filename);
            response.writeHead(200, {
              "Content-Disposition": "attachment;filename=" + "purchaslip.pdf",
              "Content-Type": "application/pdf",
            });
            filestream.pipe(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    async downloadPdf(@Req() request: Request, @Res() response: Response) {
      let purchaslip = await this.PurchasereqslipRepository.find({
        relations: ["purchasereqitem001wbs"],
      });
  
      let purchasereqslipitems = await this.purchasereqslipitemRepository.find();
  
      var fs = require("fs");
      var pdf = require("dynamic-html-pdf");
      var html = fs.readFileSync("purchasSlips.html", "utf8");
      var options = {
        format: "A3",
        orientation: "landscape",
        border: "10mm",
      };
  
      for (let i = 0; i < purchaslip.length; i++) {
        let totalAmount = 0;
  
        for (let j = 0; j < purchasereqslipitems.length; j++) {
          totalAmount = totalAmount + purchasereqslipitems[j].totalamount;
        }
  
        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();
  
        var document = {
          type: "file", // 'file' or 'buffer'
          template: html,
          context: {
            purchaslipcheck: purchaslip,
            Purchasereqslipitems: purchasereqslipitems,
            totalAmount: totalAmount,
            Totalwords: Totalwords,
          },
          path: "./pdf/purchasSlips.pdf", // it is not required if type is buffer
        };
      }
      if (document === null) {
        return null;
      } else {
        pdf
          .create(document, options)
          .then((pathRes) => {
            const filestream = createReadStream(pathRes.filename);
            response.writeHead(200, {
              "Content-Disposition": "attachment;filename=" + "purchasSlips.pdf",
              "Content-Type": "application/pdf",
            });
            filestream.pipe(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  
    async downloadExcel(@Req() request: Request, @Res() response: Response) {
      let purchaslip = await this.PurchasereqslipRepository.find({
        relations: ["purchasereqitem001wbs"],
      });
  
      let purchasereqslipitems = await this.purchasereqslipitemRepository.find();
  
      let workbook = new excel.Workbook();
  
      for (let i = 0; i < purchaslip.length; i++) {
        let worksheet = workbook.addWorksheet("PurchaseReq_Reports" + i); // creating worksheet
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
        worksheet.columns = [
          { key: "A", width: 20.0 },
          { key: "B", width: 20.0 },
          { key: "C", width: 20.0 },
          { key: "D", width: 20.0 },
          { key: "E", width: 20.0 },
          { key: "F", width: 20.0 },
          { key: "G", width: 20.0 },
          { key: "H", width: 20.0 },
        ];
  
        worksheet.columns.forEach((col) => {
          col.style.font = {
            size: 10,
            bold: true,
          };
          col.style.alignment = { vertical: "middle", horizontal: "center" };
          col.style.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
  
        worksheet.mergeCells("A1:H1");
        worksheet.getCell("A1:H1").value = "SRINIVASA ENTERPRISES";
        worksheet.getCell("A1:H1").font = {
          size: 18,
          bold: true,
        };
        worksheet.getCell("A1:H1").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
  
        worksheet.mergeCells("A2:H2");
        worksheet.getCell("A2:H2").value = "PURCHASE REQUISITION SLIP";
        worksheet.getCell("A2:H2").font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell("A2:H2").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
  
        worksheet.mergeCells("A3:H3");
        worksheet.getCell("A3:H3").value = "TO:";
        worksheet.getCell("A3:H3").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A3:H3").alignment = {
          vertical: "top",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("A4:D4");
        worksheet.getCell("A4:D4").value = {
          richText: [
            { text: "PRS NO :" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + purchaslip[i].prsNo },
          ],
        };
  
        worksheet.getCell("A4:D4").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A4:D4").alignment = {
          vertical: "middle",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("E4:H4");
        worksheet.getCell("E4:H4").value = {
          richText: [
            { text: "Date:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + purchaslip[i].date },
          ],
        };
        worksheet.getCell("E4:H4").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("E4:H4").alignment = {
          vertical: "middle",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("A5");
        worksheet.getCell("A5").value = "SL No";
        worksheet.getCell("A5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("B5");
        worksheet.getCell("B5").value = "Item code";
        worksheet.getCell("B5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("B5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("C5");
        worksheet.getCell("C5").value = "Item name";
        worksheet.getCell("C5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("C5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("D5");
        worksheet.getCell("D5").value = "Description";
        worksheet.getCell("D5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("D5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("E5");
        worksheet.getCell("E5").value = "UOM";
        worksheet.getCell("E5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("E5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("F5");
        worksheet.getCell("F5").value = "Unit Rate";
        worksheet.getCell("F5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("F5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("G5");
        worksheet.getCell("G5").value = "Quantity";
        worksheet.getCell("G5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("G5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("H5");
        worksheet.getCell("H5").value = "TotalAmount";
        worksheet.getCell("H5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("H5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        for (let j = 0; j < purchaslip[i].purchasereqitem001wbs.length; j++) {
          if (purchaslip[i].purchasereqitem001wbs[j].cucode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cucode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cuname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cudescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cuqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cutotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else if (purchaslip[i].purchasereqitem001wbs[j].cptcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptcode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptdescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cptqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].cpttotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else if (purchaslip[i].purchasereqitem001wbs[j].prtcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtcode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtmname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtdescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prtqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].prttotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].orderslno;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].itemname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].descrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].uom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].unitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].qunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchaslip[i].purchasereqitem001wbs[j].totalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          }
        }
  
        let purlength = purchaslip[i].purchasereqitem001wbs.length + 6;
  
        for (let k = 0; k < purchaslip[i].purchasereqitem001wbs.length; k++) {
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
        }
  
        let totalAmount = 0;
  
        for (let z = 0; z < purchasereqslipitems.length; z++) {
          if (purchasereqslipitems[z].cucode) {
            totalAmount = totalAmount + purchasereqslipitems[z].cutotalamount;
          } else if (purchasereqslipitems[z].cptcode) {
            totalAmount = totalAmount + purchasereqslipitems[z].cpttotalamount;
          } else if (purchasereqslipitems[z].prtcode) {
            totalAmount = totalAmount + purchasereqslipitems[z].prttotalamount;
          } else {
            totalAmount = totalAmount + purchasereqslipitems[z].totalamount;
          }
        }
  
        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();
  
        worksheet.mergeCells("G" + purlength);
        worksheet.getCell("G" + purlength).value = "Total";
        worksheet.getCell("G" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        worksheet.getCell("G" + purlength).alignment = {
          vertical: "middle",
          horizontal: "right",
        };
        worksheet.getCell("G" + purlength).font = {
          size: 11,
        };
  
        worksheet.mergeCells("H" + purlength);
        worksheet.getCell("H" + purlength).value = totalAmount;
        worksheet.getCell("H" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("H" + purlength).alignment = {
          vertical: "middle",
          horizontal: "right",
        };
  
        let orderlength = purlength + 1;
        worksheet.getRow(orderlength).height = 150;
        let order = "A" + orderlength + ":" + "H" + orderlength;
  
        worksheet.mergeCells(order);
        worksheet.getCell(order).value = {
          richText: [
            { font: { size: 11 }, text: "\n\n" + Totalwords + "only" },
            { text: "Terms and Conditions" + "\n\n" },
          ],
        };
        worksheet.getCell(order).alignment = {
          vertical: "top",
          horizontal: "left",
        };
        worksheet.getCell(order).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          // bottom: { style: 'thin' },
          right: { style: "thin" },
        };
  
        let signlength = orderlength + 1;
        worksheet.getRow(signlength).height = 60;
        let sign = "A" + signlength + ":" + "D" + signlength;
        worksheet.mergeCells(sign);
        worksheet.getCell(sign).border = {
          // top: { style: 'thin' },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        let signs = "E" + signlength + ":" + "H" + signlength;
        worksheet.mergeCells(signs);
        worksheet.getCell(signs).value = "Authorised Signatory";
        worksheet.getCell(signs).alignment = {
          vertical: "bottom",
          horizontal: "right",
        };
        worksheet.getCell(signs).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }
  
    async downloadIDExcel(id, response: Response) {
      let purchaslip = await this.PurchasereqslipRepository.find({
        where: { slNo: id },
        relations: ["purchasereqitem001wbs"],
      });
  
      let purchasereqslipitems = await this.purchasereqslipitemRepository.find();
  
      for (let i = 0; i < purchaslip.length; i++) {
        purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
  
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("purchaslip_reports"); // creating worksheet
        worksheet.getRow(3).height = 50;
        worksheet.getRow(4).height = 30;
        worksheet.getRow(5).height = 30;
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
          { key: "A", width: 10.0 },
          { key: "B", width: 25.0 },
          { key: "C", width: 25.0 },
          { key: "D", width: 25.0 },
          { key: "E", width: 20.0 },
          { key: "F", width: 20.0 },
          { key: "G", width: 20.0 },
          { key: "H", width: 25.0 },
        ];
  
        worksheet.columns.forEach((col) => {
          col.style.font = {
            size: 10,
            bold: true,
          };
          col.style.alignment = { vertical: "middle", horizontal: "center" };
          col.style.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
  
        worksheet.mergeCells("A1:H1");
        worksheet.getCell("A1:H1").value = "SRINIVASA ENTERPRISES";
        worksheet.getCell("A1:H1").font = {
          size: 18,
          bold: true,
        };
        worksheet.getCell("A1:H1").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
  
        worksheet.mergeCells("A2:H2");
        worksheet.getCell("A2:H2").value = "PURCHASE REQUISITION SLIP";
        worksheet.getCell("A2:H2").font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell("A2:H2").alignment = {
          vertical: "middle",
          horizontal: "center",
        };
  
        worksheet.mergeCells("A3:H3");
        worksheet.getCell("A3:H3").value = "TO:";
        worksheet.getCell("A3:H3").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A3:H3").alignment = {
          vertical: "top",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("A4:D4");
        worksheet.getCell("A4:D4").value = {
          richText: [
            { text: "PRS NO :" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + purchaslip[i].prsNo },
          ],
        };
  
        worksheet.getCell("A4:D4").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A4:D4").alignment = {
          vertical: "middle",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("E4:H4");
        worksheet.getCell("E4:H4").value = {
          richText: [
            { text: "Date:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + purchaslip[i].date },
          ],
        };
        worksheet.getCell("E4:H4").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("E4:H4").alignment = {
          vertical: "middle",
          horizontal: "left",
          wraptext: true,
        };
  
        worksheet.mergeCells("A5");
        worksheet.getCell("A5").value = "SL No";
        worksheet.getCell("A5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("A5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("B5");
        worksheet.getCell("B5").value = "Item code";
        worksheet.getCell("B5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("B5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("C5");
        worksheet.getCell("C5").value = "Item name";
        worksheet.getCell("C5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("C5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("D5");
        worksheet.getCell("D5").value = "Description";
        worksheet.getCell("D5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("D5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("E5");
        worksheet.getCell("E5").value = "UOM";
        worksheet.getCell("E5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("E5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("F5");
        worksheet.getCell("F5").value = "Unit Rate";
        worksheet.getCell("F5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("F5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("G5");
        worksheet.getCell("G5").value = "Quantity";
        worksheet.getCell("G5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("G5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("H5");
        worksheet.getCell("H5").value = "TotalAmount";
        worksheet.getCell("H5").font = {
          size: 14,
          bold: true,
        };
        worksheet.getCell("H5").alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        for (let j = 0; j < purchasereqslipitems.length; j++) {
          if (purchasereqslipitems[j].cucode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value = purchasereqslipitems[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchasereqslipitems[j].cucode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value = purchasereqslipitems[j].cuname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchasereqslipitems[j].cudescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value = purchasereqslipitems[j].cuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchasereqslipitems[j].cunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value = purchasereqslipitems[j].cuqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchasereqslipitems[j].cutotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else if (purchasereqslipitems[j].cptcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value = purchasereqslipitems[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchasereqslipitems[j].cptcode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value = purchasereqslipitems[j].cptname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchasereqslipitems[j].cptdescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value = purchasereqslipitems[j].cptuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchasereqslipitems[j].cptunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchasereqslipitems[j].cptqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchasereqslipitems[j].cpttotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else if (purchasereqslipitems[j].prtcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value = purchasereqslipitems[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchasereqslipitems[j].prtcode;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchasereqslipitems[j].prtmname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value =
              purchasereqslipitems[j].prtdescrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value = purchasereqslipitems[j].prtuom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchasereqslipitems[j].prtunitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value =
              purchasereqslipitems[j].prtqunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchasereqslipitems[j].prttotalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          } else {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value = purchasereqslipitems[j].slNo;
            worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =
              purchasereqslipitems[j].orderslno;
            worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value =
              purchasereqslipitems[j].itemname;
            worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value = purchasereqslipitems[j].descrip;
            worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value = purchasereqslipitems[j].uom;
            worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value =
              purchasereqslipitems[j].unitrate;
            worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value = purchasereqslipitems[j].qunty;
            worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
  
            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value =
              purchasereqslipitems[j].totalamount;
            worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };
          }
        }
  
        let purlength = purchasereqslipitems.length + 6;
        for (let k = 0; k < purchaslip.length; k++) {
          purchasereqslipitems = purchaslip[k].purchasereqitem001wbs;
        }
  
        let totalAmount = 0;
  
        for (let z = 0; z < purchasereqslipitems.length; z++) {
          if (purchasereqslipitems[z].cucode) {
            totalAmount = totalAmount + purchasereqslipitems[z].cutotalamount;
          } else if (purchasereqslipitems[z].cptcode) {
            totalAmount = totalAmount + purchasereqslipitems[z].cpttotalamount;
          } else if (purchasereqslipitems[z].prtcode) {
            totalAmount = totalAmount + purchasereqslipitems[z].prttotalamount;
          } else {
            totalAmount = totalAmount + purchasereqslipitems[z].totalamount;
          }
        }
  
        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();
  
        worksheet.mergeCells("G" + purlength);
        worksheet.getCell("G" + purlength).value = "Total";
        worksheet.getCell("G" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        worksheet.getCell("G" + purlength).alignment = {
          vertical: "middle",
          horizontal: "right",
        };
        worksheet.getCell("G" + purlength).font = {
          size: 11,
        };
  
        worksheet.mergeCells("H" + purlength);
        worksheet.getCell("H" + purlength).value = totalAmount;
        worksheet.getCell("H" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("H" + purlength).alignment = {
          vertical: "middle",
          horizontal: "right",
        };
  
        let orderlength = purlength + 1;
        worksheet.getRow(orderlength).height = 150;
        let order = "A" + orderlength + ":" + "H" + orderlength;
  
        worksheet.mergeCells(order);
        worksheet.getCell(order).value = {
          richText: [
            { font: { size: 11 }, text: "\n\n" + Totalwords + "only" },
            { text: "Terms and Conditions" + "\n\n" },
          ],
        };
        worksheet.getCell(order).alignment = {
          vertical: "top",
          horizontal: "left",
        };
        worksheet.getCell(order).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          // bottom: { style: 'thin' },
          right: { style: "thin" },
        };
  
        let signlength = orderlength + 1;
        worksheet.getRow(signlength).height = 60;
        let sign = "A" + signlength + ":" + "D" + signlength;
        worksheet.mergeCells(sign);
        worksheet.getCell(sign).border = {
          // top: { style: 'thin' },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        let signs = "E" + signlength + ":" + "H" + signlength;
        worksheet.mergeCells(signs);
        worksheet.getCell(signs).value = "Authorised Signatory";
        worksheet.getCell(signs).alignment = {
          vertical: "bottom",
          horizontal: "right",
        };
        worksheet.getCell(signs).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        return workbook.xlsx.write(response).then(function () {
          response["status"](200).end();
        });
      }
    }
  }