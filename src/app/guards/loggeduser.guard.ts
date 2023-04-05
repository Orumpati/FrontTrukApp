import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
@Injectable({
  providedIn: 'root'
})
export class LoggeduserGuard implements CanActivate {
  logindata: any;
  constructor(private router :Router,private service:CommonServiceService){
    this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
    console.log(this.logindata)
  }


  canActivate(){
    if(this.service.isloggedIn() ){
      this.router.navigate(['tab/shipperhome'])
      return true;
      
     
    }else{
      this.router.navigate(['selectlanguage'])
      
      return false
     
    }
    
  }
  
}
