import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-faq',
  templateUrl: './contact-faq.page.html',
  styleUrls: ['./contact-faq.page.scss'],
})
export class ContactFaqPage implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }

  clickhere(){
    var data ={
      hideQuery:false
    }
    this.router.navigate(['modal-contact'])
    localStorage.setItem('clickhere',JSON.stringify(data))
  }

}
