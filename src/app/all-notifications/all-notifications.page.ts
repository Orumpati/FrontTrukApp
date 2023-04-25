import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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
  constructor( private location:Location,private router:Router) {

   }

  ngOnInit() {
 
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    this.allNotifications = localStorage.getItem('InappNotifictions') 
if(this.allNotifications){
  this.allNotificatio =1
}else{
this.allNotificatio =0
}
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
}
