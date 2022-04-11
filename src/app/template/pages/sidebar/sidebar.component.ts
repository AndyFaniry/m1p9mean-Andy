import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'api/collection/user/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 
  public user: User ;
  public restoContent: boolean = false;
  public admin: any=[
    {'url':'app/admin/resto','icon':'icon-home','libelle':'Restaurants'},
    {'url':'app/admin/livreur','icon':'icon-user','libelle':'Livreurs'},
    {'url':'app/admin/commande','icon':'icon-calendar','libelle':'Commandes'},
    {'url':'app/admin/benefice','icon':'icon-money','libelle':'Bénéfices'},
  ];
  public client: any=[
    {'url':'app/client/plat','icon':'icon-book','libelle':'Plats'},
    {'url':'app/client/commande','icon':'icon-calendar','libelle':'Commandes'},
  ];
  public resto: any=[
    {'url':'app/restaurant/plat','icon':'icon-book','libelle':'Plats'},
    {'url':'app/restaurant/commande','icon':'icon-calendar','libelle':'Commandes'},
    {'url':'app/restaurant/benefice','icon':'icon-money','libelle':'Bénéfices'},
  ];
  public livreur: any=[
    {'url':'app/livreur','icon':'icon-user','libelle':'Livraisons'},
  ];
  public menus: any;
  public entet: String;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.checkProfil();
  }
  deconnect(){
    localStorage.clear();
    this.route.navigate(['app/']);
  }
  checkProfil(){
    if(this.user.userType.name === 'admin'){
      this.menus = this.admin;
      this.entet = "Administrateur E-Kaly";
    }
    if(this.user.userType.name === 'restaurant'){
      this.menus = this.resto;
      this.entet = "Restaurant: "+ this.user.lastName;
    }
    if(this.user.userType.name === 'client'){
      this.menus = this.client;
      this.entet = this.user.lastName+" "+this.user.firstName;
    }
    if(this.user.userType.name === 'livreur'){
      this.menus = this.livreur;
      this.entet = "Livreur: "+this.user.lastName+" "+this.user.firstName;
    }
  }
}