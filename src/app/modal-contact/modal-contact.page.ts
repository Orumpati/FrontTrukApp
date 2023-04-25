import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.page.html',
  styleUrls: ['./modal-contact.page.scss'],
})
export class ModalContactPage implements OnInit {

  Name:any;
  PhoneNumber:any;
  Query:any;
  Email:any
  Items: any;
  To: any;
  type: any;
  quoteid: any;
  Loadid:any
  hide: any;
  

  constructor(private alertController: AlertController,private router: Router) { }

  ngOnInit() {

    this.type= JSON.parse(localStorage.getItem('contactDetails')||'{}')
    this.quoteid= JSON.parse(localStorage.getItem('contactLoad')||'{}')

  console.log(this.type)
  this.hide= JSON.parse(localStorage.getItem('clickhere')||'{}')
  }


  async addContact() {
    var data = {
      Name: this.Name,
      PhoneNumber:this.PhoneNumber,
      To:this.To,
      Query:this.Query,
      Loadid:this.quoteid._id
    }
    console.log(data)
    localStorage.setItem("newpostAdd", JSON.stringify(data));

    fetch("https://trukapp2023.herokuapp.com/contact/addcontact", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then( async result => {
        console.log(result),
          this.Items = result
          this.email();  
          const alert = await this.alertController.create({
            header: 'Successfull',
            // subHeader: 'Important message',
            message: 'You will recevive a call from our customer care within 1 hours',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  console.log('Confirm Okay');
                  this.PhoneNumber=''
                  this.To=''
                  this.Query=''
                  this.Name=''
                  //you can write your code or redirection 
                  // sample redirection code 
                 // window.location.href = '/contact-us';
                  this.router.navigate(['/contact-us']);
  
                }
                
              },
            ],
          });
  
          await alert.present();   
      }

      ).catch(err =>
        console.log(err))
       
  }



  email() {
    var data = {
      text:`
      A Query request for Load has been made. Please take action immediately
           UserName:${this.Name}
           MobileNo: ${this.PhoneNumber} 
           To: ${this.To} 
           Query:${this.Query}
           
           
           Regards,
           TrukApp Referrals
           `  
  }
    console.log(data)

    fetch("https://trukapp2023.herokuapp.com/contact/emailnotification", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.Items = result  
          
      }

      ).catch(err =>
        console.log(err))
  }


}
