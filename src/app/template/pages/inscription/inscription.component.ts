import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services/user/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  public error: Boolean = false;
  public spinner: boolean = false;
  constructor(private user: UserService,private route:Router) { }

  public signup(): void{
    this.spinner=true;
    this.user.signup(this.form.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token-'+res.user.userType.name,res.token);
        this.spinner=false;
        this.error=false;
        this.route.navigate(['app/client/']);
      },
      error: (err) => {this.error=true; this.spinner=false;}
    })
  }

}
