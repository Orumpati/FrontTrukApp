import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.page.html',
  styleUrls: ['./star-rating.page.scss'],
})
export class StarRatingPage implements OnInit {

  Items: any;

  // rating3: any;
  constructor(){
  
  }

  ngOnInit(): void {
    // this.rating3 = 0;
  }

  
  star = [1,   2,   3,   4,   5];
  rating = 0;
  staring:any;

  
  updateRating(r: any) {
    console.log(r)
    this.rating = r

  var body = {
    staring:this.rating
  }
    fetch("https://trukapp2023.herokuapp.com/staring/staring", {
      method: 'post',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.Items = result  
          
      }

      ).catch(err =>
        console.log(err))
  }

}
