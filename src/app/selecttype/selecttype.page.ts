import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-selecttype',
  templateUrl: './selecttype.page.html',
  styleUrls: ['./selecttype.page.scss'],
})
export class SelecttypePage implements OnInit {
type:any
  constructor(private router:Router, private navCtrl: NavController,
    private platform: Platform) { 
      //window.location.reload()
    }

  ngOnInit() {
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
