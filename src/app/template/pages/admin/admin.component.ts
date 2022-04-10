import { Component, OnInit } from '@angular/core';
import { User } from 'api/collection/user/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route:Router,private activeRoute: ActivatedRoute) { }
  public user: User;
  public resto: boolean= true;
  public livreur: boolean = false;
  public commande: boolean = false;
  public benefice: boolean = false;
  public type: string;
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.type = this.activeRoute.snapshot.paramMap.get('type');
    if(this.user===null){
      this.route.navigate(['app/']);
    }
    if(this.type==="resto"){
      this.clickResto();
    }
    if(this.type==="livreur"){
      this.clickLivreur();
    }
    if(this.type==="commande"){
      this.clickCommande();
    }
    if(this.type==="benefice"){
      this.clickBenefice();
    }
  }
  public clickResto(){
    this.resto = true;
    this.livreur = false;
    this.commande = false;
    this.benefice = false;
  }
  public clickLivreur(){
    this.resto = false;
    this.livreur = true;
    this.commande = false;
    this.benefice = false;
  }
  public clickCommande(){
    this.resto = false;
    this.livreur = false;
    this.commande = true;
    this.benefice = false;
  }
  public clickBenefice(){
    this.resto = false;
    this.livreur = false;
    this.commande = false;
    this.benefice = true;
  }
}
