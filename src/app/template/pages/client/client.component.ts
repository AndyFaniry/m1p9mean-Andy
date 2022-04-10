import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'api/collection/user/user.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public plat: boolean= true; 
  public commande: boolean = false;
  public type: string;
  constructor(private route:Router,private activeRoute: ActivatedRoute) { }

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
  }
  public clickPlat(){
    this.plat = true;
    this.commande = false;
  }
  public clickCommande(){
    this.plat = false;
    this.commande = true;
  }

}
