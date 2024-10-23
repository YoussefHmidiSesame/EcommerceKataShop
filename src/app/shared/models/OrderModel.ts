export class OrderModel {
  SaleId: number;
  CustId: number;
  SaleDate: Date;
  TotalInvoiceAmount: number;
  Discount: number;
  PaymentNaration: string;
  DeliveryAddress1: string;
  DeliveryAddress2: string;
  DeliveryCity: string;
  DeliveryPinCode: string;
  DeliveryLandMark: string;
  IsCanceled: boolean;
  constructor(){
    this.SaleId = 0;
    this.CustId = 0;
    this.SaleDate = new Date;
    this.TotalInvoiceAmount = 0;
    this.Discount = 0;
    this.PaymentNaration ='';
    this.DeliveryAddress1='';
    this.DeliveryAddress2='';
    this.DeliveryCity='';
    this.DeliveryPinCode='';
    this.DeliveryLandMark='';
    this.IsCanceled=false;
  }
}
