export class Customer {
  custId: number;
  name: string;
  MobileNo: string;
  Password: string;

  //TODO : not satisfied by this implementation ! optimize it later
  constructor() {
    this.custId = 0;
    this.MobileNo = '';
    this.name = '';
    this.Password = '';
  }
}
