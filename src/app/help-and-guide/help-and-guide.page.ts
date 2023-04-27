import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-help-and-guide',
  templateUrl: './help-and-guide.page.html',
  styleUrls: ['./help-and-guide.page.scss'],
})
export class HelpAndGuidePage implements OnInit {
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
    this.translateConfigService.setLanguage(this.lang);
  }

}
