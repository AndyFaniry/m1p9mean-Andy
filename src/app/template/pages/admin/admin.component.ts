import { Component, OnInit } from '@angular/core';
import { User } from 'api/collection/user/user.interface';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route:Router) { }
  public user: User;
  ngOnInit(): void {
    this.user = localStorage.getItem('user') as User;
    if(this.user==null){
      this.route.navigate(['app/']);
    }
  }

}
