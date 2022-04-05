import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/services/user/user.service';

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
  constructor(private user: UserService) { }

  public login(): void{
    this.user.login(this.form.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token-'+res.user.userType.name,res.token);
        let val = this.user.checkProfi(res.user);
        alert(val);
        this.error=false
      },
      error: (err) => this.error=true
    })
  }

}
