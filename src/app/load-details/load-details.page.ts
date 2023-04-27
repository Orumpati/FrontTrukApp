import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-load-details',
  templateUrl: './load-details.page.html',
  styleUrls: ['./load-details.page.scss'],
})
export class LoadDetailsPage implements OnInit {

  body={
    OriginLocation:'',
    DestinationLocation:'',
    date: '',
    vehicle: '',
    product: '',
    Quantity: '',
  
    expectedPrice: '',
    tonnes:'',
    Number:'',
    loadCapacity:'',
  
    typeOfPay:'',
    comments:'',
    length:'',
    breadth:'',
    height:''
  }
  objects: any;
  language: any;
  lang: any;
  constructor(private translateConfigService: TranslateConfigService, private translate: TranslateService,) {

    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit():void{
    // this.get()
 
    this.objects = JSON.parse(localStorage.getItem("loadDetails") || '{}');
    console.log(this.objects)
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
   }

}
