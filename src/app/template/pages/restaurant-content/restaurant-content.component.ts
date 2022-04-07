import { Component, OnInit } from '@angular/core';
import { Resto } from 'api/collection/resto/resto.interface';
import { RestaurantService } from 'src/app/api/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-content',
  templateUrl: './restaurant-content.component.html',
  styleUrls: ['./restaurant-content.component.scss']
})
export class RestaurantContentComponent implements OnInit {

  public restos: Resto[] ;
  public token: string = localStorage.getItem('token');
  constructor(private resto: RestaurantService) { }

  ngOnInit(): void {
     this.findAll(this.token); 
  }
  
  public findAll(token){
    this.resto.findAll(token) .subscribe({
      next: (res) => {
        this.restos=res;
      },
      error: (err) => {console.log(err);}
    });
  }
}
