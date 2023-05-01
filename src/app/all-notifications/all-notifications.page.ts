import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.page.html',
  styleUrls: ['./all-notifications.page.scss'],
})
export class AllNotificationsPage implements OnInit {
  allNotifications: any;
date:any;
  logindata: any;
  logo: any;
  allNotificatio =0
  language: any;
  lang: any;
  constructor( private location:Location,private router:Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {

    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();

    this.allNotifications = JSON.parse(localStorage.getItem('InappNotifictions') ||'null')
   }

  ngOnInit() {
 
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);

    this.date = new Date().getTime()
    this.dackendImages()

  }

  dackendImages(){
    fetch("https://trukapp2023.herokuapp.com/truckinfo/gethome",{
        
    method:'get',
    headers:{
              "Access-Control-Allow-Origin": "*",
          
            },
  
    }).then(res => res.json())
    
    .then(
      async result =>{
      
      
   console.log(result)
   for(let i=0;i<result.data.length;i++){
    this.logo=result.data[i].trucklogo
   }
  console.log(this.logo)
      })
  }

  back(){
this.location.back()
  }
  getTimeStamp(){
    return new Date().toLocaleString();
  }
goback(){
  if(this.logindata.role == 'Shipper'){
    this.router.navigate(['tab/tab1'])
  }else{
    this.router.navigate(['tab/tab2'])
  }
}
clearNotifications(){
  localStorage.removeItem('InappNotifictions')
  this.allNotifications = JSON.parse(localStorage.getItem('InappNotifictions') ||'null')
}
}
