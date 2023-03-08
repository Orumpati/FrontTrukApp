import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { reload } from 'firebase/auth';
import { LoadingController } from '@ionic/angular';
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
  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
    this.logindata =  JSON.parse(localStorage.getItem('regdata')|| '{}')
    console.log(this.logindata)
    this.get()
    this.gettrucks()
    /*this.http.get('http://localhost:3000/images').subscribe(images => {
      console.log(images)
      this.bannerImages = images;
    });*/

    fetch("https://amused-crow-cowboy-hat.cyclic.app/truckinfo/gethome",{
      //fetch("https://api.emptra.com/aadhaarVerification/requestOtp", {
        
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
      
          })
        
  }

  async get() {
    const loading = await this.loadingController.create({
      //message: '...',
      spinner: 'lines'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/allQuotes", {
      method: 'GET',
      headers: {
        "access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.Loads
          var activeloads1 = this.item.filter((data:any) =>{
                return data.isActive  === 'Active'
          })
          this.activeloads1= activeloads1.length
          
          var pendbids1 = this.item.filter((data:any) =>{
            return data.isActive  === 'In-Progress'
      })
      this.pendingbids1= pendbids1.length

      var closebids1 = this.item.filter((data:any) =>{
        return data.isActive  === 'Completed'
  })
  this.closedbids1= closebids1.length
         console.log(this.item)
         loading.dismiss()
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)})
  }
  looking(data:any){
    console.log(data)
    localStorage.setItem('lookingfor',JSON.stringify(data))
    
window.location.reload()
  }


  gettrucks() {
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/allVehicles/" +"8897820507", {
      method: 'GET',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.truck = result.data
          var acttruck = this.truck.filter((data:any) =>{
            return data.trukisActive  === 'Active'
      })
      this.activetrucks= acttruck.length
        console.log(this.truck)
      }

      ).catch(err =>
        console.log(err))
  }


  /*bannerImages = [
    {
      imgurl: 'https://th.bing.com/th?id=OIP.mDbUajyLNzxCJkZJTw-ysgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    }, {
      imgurl: 'https://th.bing.com/th?id=OIP.mDbUajyLNzxCJkZJTw-ysgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    }, {
      imgurl: 'https://th.bing.com/th?id=OIP.mDbUajyLNzxCJkZJTw-ysgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    },
    {
      imgurl: 'https://th.bing.com/th?id=OIP.mDbUajyLNzxCJkZJTw-ysgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    },
    {
      imgurl: 'https://th.bing.com/th?id=OIP.mDbUajyLNzxCJkZJTw-ysgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    }
  ];*/
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
