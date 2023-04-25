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
  Finalstatus="Delivered";
  DeliveredOn =new Date();
  logindata: any;
  transId: any;
  getload: any;

  constructor() { }

  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata')||'{}')
    this.transId = JSON.parse(localStorage.getItem('onlyTranspoterId')||'{}')
    this.getload=JSON.parse(localStorage.getItem('selectedLoad') || '{}')
  }
  sumbit(){
    var body ={
      _id :this.getload._id,
      waybill:this.waybill,
      orderId:this.orderId,
      ConsigneeName:this.ConsigneeName,
      Address:this.Address,
      Finalstatus:this.Finalstatus,
      DeliveredOn:this.DeliveredOn,
      DriverStatus:"Completed"
    }
    
    fetch("https://trukapp2023.herokuapp.com/quotes/attachPod", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),

    })
      .then(response => response.json())
      .then(async result => {
        console.log(result)

    window.location.href='/previous-loads'


      }

      ).catch(err =>
        console.log(err))
    

  }

  statusChange(){
    var body ={
      _id :this.transId,
      DriverNumber:this.logindata.DriverNumber,
      Availability:true
    }
    fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/updateAvailability", {
        
    method:'post',
    headers:{
              "Access-Control-Allow-Origin": "*",
                "Content-Type":'application/json'
            },
    body:JSON.stringify(body),
    }).then(res => res.json())
    
    .then(
      result =>{
        //loading.dismiss()
   console.log(result)
      }
      ).catch(
          error =>{
            //loading.dismiss()
            //alert('unable update Data');
           console.log(error)
          });
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
  
  }

  

