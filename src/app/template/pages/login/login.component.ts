import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services/user/user.service';
import {Router} from '@angular/router';
import { parseJsonText } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  public error: Boolean = false;
  public spinner: boolean = false;
  constructor(private user: UserService,private route:Router) { }

  public login(): void{
    this.spinner=true;
    this.user.login(this.form.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token-'+res.user.userType.name,res.token);
        localStorage.setItem('user',JSON.stringify(res.user));
        let val = this.user.checkProfi(res.user);
        this.spinner=false;
        this.error=false;
        this.route.navigate(['app/'+val]);
      },
      error: (err) => {this.error=true; this.spinner=false;}
    })
  }

}
