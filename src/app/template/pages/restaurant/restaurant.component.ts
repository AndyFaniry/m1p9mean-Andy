import { RestaurantService } from 'src/app/api/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resto } from 'api/collection/resto/resto.interface';
import { User } from 'api/collection/user/user.interface';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  public restaurant: Resto;
  public plat: boolean= true; 
  public commande: boolean = false;
  public benefice: boolean = false;
  public type: string;
  constructor(private route:Router,private activeRoute: ActivatedRoute,private restoService:RestaurantService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user')) as User;
    this.type = this.activeRoute.snapshot.paramMap.get('type');
    if(user===null){
      this.route.navigate(['app/']);
    }
    if(this.type==="plat"){
      this.clickPlat();
    }
    if(this.type==="commande"){
      this.clickCommande();
    }
    if(this.type==="benefice"){
      this.clickBenefice();
    }
  }
  public clickPlat(){
    this.plat = true;
    this.commande = false;
    this.benefice = false;
  }
  public clickCommande(){
    this.plat = false;
    this.commande = true;
    this.benefice = false;
  }
  public clickBenefice(){
    this.plat = false;
    this.commande = false;
    this.benefice = true;
  }
}