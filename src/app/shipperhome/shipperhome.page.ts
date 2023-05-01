import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { reload } from 'firebase/auth';
import { LoadingController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
//import { TranslateService } from '@ngx-translate/core';


import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ModalController } from '@ionic/angular';
import { ViewvideoPage } from '../viewvideo/viewvideo.page';
import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-shipperhome',
  templateUrl: './shipperhome.page.html',
  styleUrls: ['./shipperhome.page.scss'],
})
export class ShipperhomePage implements OnInit {
  @ViewChild(IonicSlides)
  slides!: typeof IonicSlides;
  @ViewChild("videoPlayer", { static: false }) videoplayer!: ElementRef;
  isPlay: boolean = false;

  bannerImages:any
  slide:any
  adsarray:any=[]
  logindata:any
   // variables
    slideOpt = {
    slidesPerView: 3
  }
   buttonSlide = {
    slidesPerView: 5
  }
   verticalSlide = {
    initialSlide: 1,
    direction: 'vertical',
    slidesPerView: 1.5,
  }
// set app banner slides
slideOpts = {
  initialSlide: 0,
  speed: 2000,
  loop: true,
  innerHeight:100,
  
  autoplay: {
    delay: 1900,
    disableOnInteraction:false,
    
  }
};

option = {
  slidesPerView: 1.5,
  //centeredSlides: true,
  loop: true,
  spaceBetween: 4,
  // autoplay:true,
}
  item: any;
  activeloads1: any;
  pendingbids1: any;
  closedbids1: any;
  truck: any;
  activetrucks: any;
  truckshift: any;
  loadshift: any;
  loortr: any;
  completetrucks: any;
  openbanner=false;
  lang: any;
  referbanner: any;
  trukbanner: any;
  truklogo: any;
  language: any;
  kycbanner: any;
  goodsbanner: any;
  trukroad: any;
  videoUrl = 'https://drive.google.com/file/d/1IIjLukVaLGmlY3_OMvNXZbQFRB70NS8m/view?usp=drivesdk/preview';
  postload ='https://drive.google.com/file/d/1HSL5XgNk_6NRs5GLXilQ6EeB7Yh3YT9V/view?usp=drivesdk/preview'
  addyourtruk ='https://drive.google.com/file/d/1I4EaZ6i-HS9fTWYkHqXx6oNL3EJkNOZ_/view?usp=drivesdk/preview'
  constructor(public loadingController: LoadingController,private router:Router  ,  
    
    private translateConfigService: TranslateConfigService, private translate: TranslateService,private inAppBrowser: InAppBrowser,
    
    
    public actionSheetController: ActionSheetController,private videoPlayer: VideoPlayer, public modalCtrl: ModalController
    ) { 


      this.translateConfigService.getDefaultLanguage();
      this.language = this.translateConfigService.getCurrentLang();

      
   this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')



  //  translateService.addLangs(['en', 'hi']);
  //  translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.logindata =  JSON.parse(localStorage.getItem('regdata')|| '{}')

    if(this.logindata.aadharVerify == 'notVerified' || this.logindata.gstVerify == 'notVerified'){
      this.modalorp()
    }
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
     this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')
     console.log(this.lang)
    console.log(this.logindata)
    this.get()
    this.gettrucks()



    this. databaseimgs()
    this.changeLanguage()    
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  
  playVideo() {
    this.inAppBrowser.create(this.videoUrl, '_system');
  }
  postaload() {
    this.inAppBrowser.create(this.postload, '_system');
  }
  addtruk() {
    this.inAppBrowser.create(this.addyourtruk, '_system');
  }
  playVideoHosted() {
    this.videoPlayer.play('https://youtu.be/UT4WF5ajiVs').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
  modalorp(){
    this.openbanner =!this.openbanner;
    
   }
  async databaseimgs(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://trukapp2023.herokuapp.com/truckinfo/gethome",{
      
        
        method:'get',
        headers:{
                  "Access-Control-Allow-Origin": "*",
              
                },
      
        }).then(res => res.json())
        
        .then(
          async result =>{
            this.slide=result
          
       console.log(result)
       for(let i=0;i<result.data.length;i++){
        this.referbanner=result.data[i].Referbanner
        this.trukbanner=result.data[i].Trukbanner
        this.truklogo=result.data[i].truklogo
        this.kycbanner=result.data[i].kycbanner
        this.goodsbanner =result.data[i].goodsbanner
        this.trukroad =result.data[i].trukroad
        this.adsarray=result.data[i]
        console.log(this.adsarray)
       }
      loading.dismiss()
          })
  }
  async get() {
   
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://trukapp2023.herokuapp.com/quotes/allQuotes", {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.Loads
          var loginuser = this.item.filter((data:any) =>{
            return data.Number  == this.logindata.mobileNo
      })



          var activeloads1 = loginuser.filter((data:any) =>{
                return data.isActive  === 'Active'
          })
          console.log(activeloads1)
          this.activeloads1= activeloads1.length
          
          var pendbids1 = loginuser.filter((data:any) =>{
            return data.isActive  === 'In-Progress'
      })
      this.pendingbids1= pendbids1.length

      var closebids1 = loginuser.filter((data:any) =>{
        return data.isActive  === 'Completed'
  })
  this.closedbids1= closebids1.length
         console.log(this.item)
         loading.dismiss()
      }).catch(err =>{
        
        console.log(err)})
  }
  looking(){
  this.truckshift ="trucks"
    localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
    
window.location.reload()
  }
  lookingload(){
  this.truckshift ="loads"
    localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
    window.location.reload()
//this.router.navigate('shipperhome')
  }
  languages(language:any){
    if(language == 'en'){
      alert("Language will change to English")
    
      localStorage.setItem('language',JSON.stringify(language))
      window.location.reload()
    }else{
      alert("language will change to Hindi")
      localStorage.setItem('language',JSON.stringify(language))
      window.location.reload()
    }

  }
  gettrucks() {
    fetch("https://trukapp2023.herokuapp.com/addTruk/allVehicles/" +this.logindata.mobileNo, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.truck = result.data 

          var userlogin = this.truck.filter((data:any) =>{
            return data.trukOwnerNumber  == this.logindata.mobileNo
      })

          var acttruck = userlogin.filter((data:any) =>{
            return data.trukisActive  === 'Active'
      })

      var comtruck = userlogin.filter((data:any) =>{
        return data.trukisActive  === 'Completed'
  })
      this.activetrucks= acttruck.length
      this.completetrucks= comtruck.length
        console.log(this.truck)
      }

      ).catch(err =>
        console.log(err))
  }


  // async changeLanguage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Languages',
  //     buttons: [{
  //       text: 'English',
  //       icon: 'language-outline',
  //       handler: () => {
  //         this.language = 'en';
  //         this.translateConfigService.setLanguage('en');
  //       }
  //     }, {
  //       text: 'Spanish',
  //       icon: 'language-outline',
  //       handler: () => {
  //         this.language = 'hi';
  //         this.translateConfigService.setLanguage('hi');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }

  changeLanguage(){
    this.translateConfigService.setLanguage(this.lang);
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
