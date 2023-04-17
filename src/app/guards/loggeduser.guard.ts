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
    if(this.service.isloggedIn() &&( this.logindata.role == 'Shipper' || this.logindata.role == 'Transporter' || this.logindata.role == 'Fleet Owner') ){
      this.router.navigate(['tab/shipperhome'])
 return true
       }else if(this.logindata.userRole == 'Driver'){
      this.router.navigate(['tab/driver-active-loads'])
      
      return true
     
    }else{
      this.router.navigate(['selectlanguage'])
      return false
    }
    
  } 
  
}
