import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-selecttype',
  templateUrl: './selecttype.page.html',
  styleUrls: ['./selecttype.page.scss'],
})
export class SelecttypePage implements OnInit {
type:any
  language: any;
  lang: any;
  constructor(private router:Router, private navCtrl: NavController,
    private platform: Platform,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
      //window.location.reload()

      
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
    }

  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
  }
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      location.reload();
    });
  }

  out(data:any){
    this.type=data
    console.log(data)

  }

  selectType(){
    localStorage.setItem('selectType',JSON.stringify(this.type))
    //this.router.navigate(['signup'])
window.location.href="/signup"
  }
  autorefresh(event:any){
   
    setTimeout(() => {
  window.location.href="/selecttype"
      event.target.complete()
      
      
    }, 2000);
  }

}
