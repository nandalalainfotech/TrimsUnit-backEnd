import { Orderitem001mb } from "src/entity/Orderitem001mb";



export class OrderItemMbDTO {
    slNo: number;
    unitdepartslNo: number;
    itemcode: string;
    itemname: string;
    descrip: string;
    hsn: string;
    qunty: string;
    unitamount: number;
    uom: string;
    gst: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    pslno2:any
    

    setProperties(orderitem001mb: Orderitem001mb) {
        this.slNo=orderitem001mb.slNo;
        this.unitdepartslNo=orderitem001mb.unitdepartslNo;
        this.itemcode=orderitem001mb.itemcode;
        this.itemname=orderitem001mb.itemname;
        this.descrip=orderitem001mb.descrip;
        this.unitamount=orderitem001mb.unitamount;
        this.uom=orderitem001mb.uom;
        this.gst=orderitem001mb.gst;
        this.hsn=orderitem001mb.hsn;
        this.qunty = orderitem001mb.qunty;
        this.insertUser = orderitem001mb.insertUser;
        this.insertDatetime = orderitem001mb.insertDatetime;
        this.updatedUser = orderitem001mb.updatedUser;
        this.updatedDatetime = orderitem001mb.updatedDatetime;
    }
}