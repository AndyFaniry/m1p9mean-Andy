import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services/user/user.service';

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
  constructor(private user: UserService) { }

  public signup(): void{
    this.user.signup(this.form.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token-'+res.user.userType.name,res.token);
        this.error=false;
      },
      error: (err) => this.error=true
    })
  }

}
