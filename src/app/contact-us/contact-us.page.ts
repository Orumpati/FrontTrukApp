import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  item: any = [];
  OriginLocation: any;
  DestinationLocation: any;
  date: any;
  data: any;
  expectedPrice: any;
  Quantity: any;
  product: any;
  typeOfPay: any;


  Name: any;
  PhoneNumber: any;
  Query: any;
  Email: any
  Items: any;
  To: any;

  type: any;
  ss: any;
  hide = 'no';
  selectedItem: any;
  logindata: any;
  itemlen: any;
  language: any;
  lang: any;


  constructor(private alertController: AlertController, public atrCtrl: AlertController, private router: Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata') || '{}')
    this.type = JSON.parse(localStorage.getItem('typeofpay') || '{}')
    console.log(this.type)
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Query Submitted Successfully.Our Team will reach out to you within 24 hours',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            //you can write your code or redirection 
            // sample redirection code 
            //window.location.href = '/contact-us';
            this.router.navigate(['/contact-us']);


          }
        }

      ],
    });

    await alert.present();
  }


 


  get() {
    localStorage.removeItem('clickhere')
    var data ={
      Number:this.logindata.mobileNo,
      isActive:"Active"
    
    }
    fetch("https://trukapp2023.herokuapp.com/quotes/contactusStatusAndNumber", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body:JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
        this.itemlen =result.TotalLoads
          this.item = result.load
        console.log(this.item)
      }

      ).catch(err =>
        console.log(err))
  }
  typeofPay(data: any) {
    console.log(data)

      this.ss = data
  
    
    localStorage.setItem("typeofpay", JSON.stringify(this.ss));

  }


  async showConfirmAlert(data: any) {
    if (this.ss === 'Online') {
      let alertConfirm = await this.atrCtrl.create({
        header: 'alter',
        message: '<ion-icon name="call"></ion-icon> <br> Do you want to make a call <br>',

        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('No clicked');
              this.router.navigate(['/contact-us']);
            }
          },
          {
            text: 'Yes',
            handler: () => {
              const phoneNumber = '91+9391311615';
              const link = document.createElement('a');
              link.setAttribute('href', 'tel:' + phoneNumber);
              link.setAttribute('target', '_system');
              document.body.appendChild(link);
              link.click();
              link.remove();
            }

          }
        ]
      });
      alertConfirm.present();
    } else {
      window.location.href = '/modal-contact'

      localStorage.setItem("contactDetails", JSON.stringify(data));
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  contactLoad(data: any) {
    localStorage.setItem("contactLoad", JSON.stringify(data));

  }



}
