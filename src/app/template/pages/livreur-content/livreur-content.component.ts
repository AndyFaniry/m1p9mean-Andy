import { AlertService } from 'src/app/api/services/alert/alert.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'api/collection/user/user.interface';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-livreur-content',
  templateUrl: './livreur-content.component.html',
  styleUrls: ['./livreur-content.component.scss']
})
export class LivreurContentComponent implements OnInit {

  public livreurs: User[] ;
  public liste: boolean = true;
  public formulaire: boolean = false;
  public isAddMode: boolean = false;
  public info: boolean = false;
  public loading: boolean = false;
  public token: string = localStorage.getItem('token');
  public submitted: boolean = false;
  public error: boolean= false;
  public livreur: User ;
  public form: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required,Validators.email]),
  });
  constructor(private userService: UserService, private router: Router,private alertService: AlertService) { }

  ngOnInit(): void {
    this.findAll();
  }
  public  findAll(){
    this.loading = true;
     this.userService.findAllLivreur(this.token) .subscribe({
      next: (res) => {
        this.livreurs =  res;
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
  public clickButton(id){
    this.formulaire=true;
    this.liste= false;
    this.isAddMode = !id;
    if (!this.isAddMode) {
      this.loading = true;
      this.userService.findOne(this.token,id) .subscribe({
        next: (res) => {
          this.livreur = res;
          this.form.patchValue({lastName:res.lastName,firstName:res.firstName,login:res.login});
          this.loading = false;
        },
        error: (err) => { this.loading = false;}
      });
    }
  }
  public submitForms(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var livr: User = {
        'userType':{
          'name':'livreur',
        },
        'login': this.form.value.login,
        'lastName': this.form.value.lastName,
        'firstName': this.form.value.firstName,
    };
    if (this.isAddMode) {
         livr.password = bcrypt.hashSync("livreur@"+(livr.lastName).split(" ",1), 10);
        var val = this.alertService.confirmation('question','Enregistrer','Voulez-vous enregistrer?');  
        val.then((result) => {
          if (result.value) {
            this.createLivreur(livr);
            this.loading = true;
        }
      });
    } else {
        livr._id=this.livreur._id;
        livr.password = this.livreur.password;
        var val = this.alertService.confirmation('question','Modifier','Voulez-vous modifier?');
        val.then((result) => {
          if (result.value) {
            this.updateLivreur(livr);
            this.loading = true;
        }
      });
    }
  }
  public createLivreur(livreur: User){
    this.userService.create(livreur,this.token) .subscribe({
      next: (res) => {
        this.livreurs.push(res);
        this.alertService.success(`Livreur enregistrer`);
        this.loading = false;
        this.formulaire = false;
        this.liste = true;
        this.loading = false;
        this.submitted=false;
        this.form.reset();
      },
      error: (err) => {this.alertService.error(`Erreur d'enregistrement`);this.loading=false;this.error = true;this.submitted=false}
    });  
    this.error=false;
  }
  public updateLivreur(livreur: User){
    this.userService.update(livreur,this.token) .subscribe({
      next: (res) => {
        this.findAll();
        this.alertService.success(`Livreur modifier`);
        this.loading = false;
        this.formulaire = false;
        this.liste = true;
        this.loading = false;
        this.submitted = false;
        this.livreur._id=null;
        this.form.reset();
      },
      error: (err) => {this.alertService.error(`Erreur de modification`);this.loading=false;this.error = true;this.submitted=false}
    });
    this.error=false;
  }
  public annuler(){
    this.formulaire = false;
    this.liste = true;  
    this.livreur._id=null;
    this.submitted = false;
    this.info = false;
    this.form.reset();
  }
  public deleteLivreur(idLivreur){
    var val = this.alertService.confirmation('warning','Supprimer','Voulez-vous supprimer?');
    val.then((result) => {
      if (result.value) {
        this.loading = true;
        this.userService.delete(idLivreur,this.token) .subscribe({
          next: (res) => {
            this.loading = false;
            this.findAll();
            this.alertService.success(`Livreur supprimer`);
          },
          error: (err) => {this.alertService.error(`Erreur de suppression`);this.loading=false}
        });
        
    }
    });
  }
  public infoLivreur(id){
    this.clickButton(id);
    this.info=true;
  }
}
