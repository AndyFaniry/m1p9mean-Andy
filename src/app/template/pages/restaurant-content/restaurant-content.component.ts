import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resto } from 'api/collection/resto/resto.interface';
import { RestoModel } from 'api/collection/resto/resto.schema';
import { AlertService } from 'src/app/api/services/alert/alert.service';
import { RestaurantService } from 'src/app/api/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-content',
  templateUrl: './restaurant-content.component.html',
  styleUrls: ['./restaurant-content.component.scss']
})
export class RestaurantContentComponent implements OnInit {

  public restos: Resto[] ;
  public liste: boolean = true;
  public formulaire: boolean = false;
  public isAddMode: boolean = false;
  public loading: boolean = false;
  public token: string = localStorage.getItem('token');
  public submitted: boolean = false;
  public error: boolean= false;
  public resto: Resto ;
  public form: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required,Validators.email]),
    pourcentage: new FormControl('', [Validators.required])
  });
  
  constructor(private restoService: RestaurantService, private router: Router,private alertService: AlertService) { }

  ngOnInit(): void { 
      this.findAll(); 
  }
  
  public findAll(){
    this.restoService.findAll(this.token) .subscribe({
      next: (res) => {
        this.restos=res;
      },
      error: (err) => {}
    });
  }
  public clickButton(id){
    this.formulaire=true;
    this.liste= false;
    this.isAddMode = !id;
    if (!this.isAddMode) {
      this.restoService.findOne(this.token,id) .subscribe({
        next: (res) => {
          this.resto = res;
          this.form.patchValue({lastName:res.user.lastName,address:res.address,login:res.user.login,pourcentage:res.pourcentage});
        },
        error: (err) => {}
      });
    }
  }
  
  public submitForms(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var restoo: Resto = {
      'user':{
        'userType':{
          'name':'Restaurant',
        },
        'login': this.form.value.login,
        'lastName': this.form.value.lastName,
      },
      'address':this.form.value.address,
      'pourcentage':this.form.value.pourcentage,
    };
    if (this.isAddMode) {
        var val = this.alertService.confirmation('question','Enregistrer','Voulez-vous enregistrer?');  
        val.then((result) => {
          if (result.value) {
            this.createResto(restoo);
            this.loading = true;
        }
      });
    } else {
        restoo._id=this.resto._id;
        var val = this.alertService.confirmation('question','Modifier','Voulez-vous modifier?');
        val.then((result) => {
          if (result.value) {
            this.updateResto(restoo);
            this.loading = true;
        }
      });
    }
  }

  public createResto(resto: Resto){
    this.restoService.create(resto,this.token) .subscribe({
      next: (res) => {
        this.restos.push(res);
        this.alertService.success(`Restaurant enregistrer`);
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
  public updateResto(resto: Resto){
    this.restoService.update(resto,this.token) .subscribe({
      next: (res) => {
        this.findAll();
        this.alertService.success(`Restaurant modifier`);
        this.loading = false;
        this.formulaire = false;
        this.liste = true;
        this.loading = false;
        this.submitted = false;
        this.resto._id=null;
        this.form.reset();
      },
      error: (err) => {this.alertService.error(`Erreur de modification`);this.loading=false;this.error = true;this.submitted=false}
    });
    this.error=false;
  }
  public annuler(){
    this.formulaire = false;
    this.liste = true;  
    this.resto._id=null;
    this.submitted = false;
    this.form.reset();
  }
  public deleteResto(idResto,idUser){
    var val = this.alertService.confirmation('warning','Supprimer','Voulez-vous supprimer?');
    val.then((result) => {
      if (result.value) {
        this.loading = true;
        this.restoService.delete(idResto,this.token) .subscribe({
          next: (res) => {
            this.loading = false;
            this.findAll();
            this.alertService.success(`Restaurant supprimer`);
          },
          error: (err) => {this.alertService.error(`Erreur de suppression`);this.loading=false}
        });
        
    }
    });
    
  }
}
