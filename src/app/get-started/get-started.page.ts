import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {
  // set app banner slides
  slideOpts = {
   initialSlide: 0,
   speed: 1400,
   loop: true,
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
   }
 };
  language: any;
  lang: any;
  constructor(private router:Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }
  bannerImages = [
    {
      imgurl: 'assets/1.jpg',
      live:"Truck Market",
      data:"Access Live Truck Market and Get Best Bids for your Loads"
    }, {
      imgurl: 'assets/2.jpg',
      live:"Live Market",
      data:"Book Trucks,Trailers and Tankers from the Live Market"
    }, {
      imgurl: 'assets/3.jpg',
      live:"Load Market",
      data:"Access Loads from the Live Market and provide your bids"
    }
  ];
  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
  }
route(){
  this.router.navigate(['selectlanguage'])
  window.location.href="/selectlanguage"
  
}
}
