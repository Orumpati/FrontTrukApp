import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-trukmore-details',
  templateUrl: './trukmore-details.page.html',
  styleUrls: ['./trukmore-details.page.scss'],
})
export class TrukmoreDetailsPage implements OnInit {

  truk: any;
  TrukPost: any;
  
  trukname:any;
  trukcurrentLocation:any;
  trukcapacity:any;
  trukoperatingRoutes:any;
  trukdate:any;
  trukvehiclenumber:any;
  router: any;
  trukOwnerNumber:any;
  moreDetails:any;
  language: any;
  lang: any;

  constructor(private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
    this.truk = localStorage.getItem("TrukmoreDetails"); 
    
    this.moreDetails = JSON.parse(this.truk)
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
