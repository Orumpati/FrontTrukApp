import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-faq',
  templateUrl: './contact-faq.page.html',
  styleUrls: ['./contact-faq.page.scss'],
})
export class ContactFaqPage implements OnInit {
  language: any;
  lang: any;

  constructor(private router :Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
  }

  clickhere(){
    var data ={
      hideQuery:false
    }
    this.router.navigate(['modal-contact'])
    localStorage.setItem('clickhere',JSON.stringify(data))
  }

}
