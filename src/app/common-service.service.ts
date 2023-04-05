import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }
  getLocation(){
    return this.http.get('https://ipapi.co/json/');
  }
  isloggedIn(){
    return localStorage.getItem('regdata')!=null
  }
}
