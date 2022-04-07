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
  public admin: any=[
    {'url':'app/admin','icon':'icon-home','libelle':'Restaurants'},
    {'url':'','icon':'icon-user','libelle':'Livreurs'},
    {'url':'','icon':'icon-calendar','libelle':'Commandes'},
    {'url':'','icon':'icon-money','libelle':'Bénéfices'},
  ];
  public client: any=[
    {'url':'','icon':'','libelle':''},
  ];
  public resto: any=[
    {'url':'','icon':'','libelle':''},
  ];
  public livreur: any=[
    {'url':'','icon':'','libelle':''},
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
    if(this.user.userType.name === 'resto'){
      this.menus = this.resto;
      this.entet = this.user.firstName;
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
