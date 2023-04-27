import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  logindata: any;
  language: any;
  lang: any;

  constructor(private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    console.log(this.lang)
    this.translateConfigService.setLanguage(this.lang);
  }

}
