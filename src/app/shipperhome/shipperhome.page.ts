import { Component, OnInit, } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { reload } from 'firebase/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shipperhome',
  templateUrl: './shipperhome.page.html',
  styleUrls: ['./shipperhome.page.scss'],
})
export class ShipperhomePage implements OnInit {
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
    initialSlide: 0,
    direction: 'vertical',
    slidesPerView: 1.5,
  }
// set app banner slides
slideOpts = {
  initialSlide: 0,
  speed: 200,
  loop: true,
  innerHeight:100,
  
  autoplay: {
    delay: 1900,
    disableOnInteraction: false,
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
  constructor(public loadingController: LoadingController,private router:Router) { }

  ngOnInit() {
    this.logindata =  JSON.parse(localStorage.getItem('regdata')|| '{}')
    console.log(this.logindata)
    this.get()
    this.gettrucks()
  this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')


    this. databaseimgs()    
  }

  async databaseimgs(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/truckinfo/gethome",{
      
        
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
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/allQuotes", {
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

  gettrucks() {
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/allVehicles/" +this.logindata.mobileNo, {
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


  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
