import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proofofdelivery',
  templateUrl: './proofofdelivery.page.html',
  styleUrls: ['./proofofdelivery.page.scss'],
})
export class ProofofdeliveryPage implements OnInit {

  waybill:any;
  orderId:any;
  ConsigneeName:any;
  Address:any;
  Finalstatus:any;
  DeliveredOn:any;

  constructor() { }

  ngOnInit() {
  }
  sumbit(){
    var body ={
      waybill:this.waybill,
      orderId:this.orderId,
      ConsigneeName:this.ConsigneeName,
      Address:this.Address,
      Finalstatus:this.Finalstatus,
      DeliveredOn:this.DeliveredOn
    }
    console.log(body)
  }

}
