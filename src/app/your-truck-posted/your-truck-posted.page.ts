import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-your-truck-posted',
  templateUrl: './your-truck-posted.page.html',
  styleUrls: ['./your-truck-posted.page.scss'],
})
export class YourTruckPostedPage implements OnInit {
  lang: any;
  language: any;

  constructor(private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 


    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.changeLanguage()
  }
  changeLanguage(){
    this.translateConfigService.setLanguage(this.lang);
  }
}
