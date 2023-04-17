import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private data$!: Observable<any>;
  constructor(private http:HttpClient) { }






  getLocation(){
    return this.http.get('https://ipapi.co/json/');
  }
  isloggedIn(){
    return localStorage.getItem('regdata')!=null
  }

  private _listners= new Subject<any>();
  listen():Observable<any>{
    return this._listners.asObservable()
  }
  filter(filterBy:String){
    this._listners.next(filterBy)
  }
}
