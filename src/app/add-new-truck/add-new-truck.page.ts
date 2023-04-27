import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-new-truck',
  templateUrl: './add-new-truck.page.html',
  styleUrls: ['./add-new-truck.page.scss'],
})
export class AddNewTruckPage implements OnInit {

  toppings: any;
  data: any;
  dropdownList: any[] = [];
  selectedItems: any = [];
  dropdownSettings!: IDropdownSettings;
  vehiclenumber: any;
  currentLocation: any;
  capacity: any;
  Items: any;
  date: any;
  language: any;
  lang: any;

  constructor(public navController:NavController,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
  }
route(){
  this.navController.navigateForward('/add-new-truck-details');
}
}
