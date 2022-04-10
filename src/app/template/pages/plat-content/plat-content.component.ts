import { RestaurantService } from 'src/app/api/services/restaurant/restaurant.service';
import { AlertService } from 'src/app/api/services/alert/alert.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlatType } from 'api/collection/plat/plat.interface';
import { Resto } from 'api/collection/resto/resto.interface';
import { User } from 'api/collection/user/user.interface';
import { PlatService } from 'src/app/api/services/plat/plat.service';
import Swal from 'sweetalert2';
import { DetailType } from 'api/collection/commande/commande.interface';

@Component({
  selector: 'app-plat-content',
  templateUrl: './plat-content.component.html',
  styleUrls: ['./plat-content.component.scss']
})
export class PlatContentComponent implements OnInit {
  public resto : Resto;
  public plats: PlatType[] ;
  public liste: boolean = true;
  public formulaire: boolean = false;
  public isAddMode: boolean = false;
  public info: boolean = false;
  public loading: boolean = false;
  public token: string = localStorage.getItem('token');
  public submitted: boolean = false;
  public error: boolean= false;
  public plat: PlatType ;
  public user = JSON.parse(localStorage.getItem('user')) as User;
  public isResto = this.user.userType.name === 'restaurant' ? true : false;
  public form: FormGroup = new FormGroup({
    // resto: Resto,
    code: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    pR: new FormControl('', [Validators.required]),
    pV: new FormControl('', [Validators.required]),
    // visibility: Boolean;
  });
     
  constructor(private platService: PlatService, private router: Router,private alertService: AlertService,private restoService: RestaurantService) { }

  ngOnInit(): void { 
    if(this.isResto){
      this.getResto(this.user);
      this.findAll(this.user);
    }else{
      this.findVisible();
    }
  }
  /** fonction ho an resto */
  public getResto(user){
    this.restoService.findOneByLogin(localStorage.getItem('token'),user.lastName).subscribe({
      next: (res) => {
        this.resto =  res ;
      }
    });
  }
  public  findAll(user){
    this.loading = true;
     this.platService.findAll(this.token,user.lastName) .subscribe({
      next: (res) => {
        this.plats =  res;
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
      this.platService.findOne(this.token,id) .subscribe({
        next: (res) => {
          this.plat = res;
          this.form.patchValue({code:res.code,name:res.name,pR:res.pR,pV:res.pV});
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
    var plato: PlatType = {
      'resto':this.resto,
      'code':this.form.value.code,
      'name':this.form.value.name,
      'pR':this.form.value.pR,
      'pV':this.form.value.pV,
      'visibility': true
    };
    if (this.isAddMode) {
        var val = this.alertService.confirmation('question','Enregistrer','Voulez-vous enregistrer?');  
        val.then((result) => {
          if (result.value) {
            this.createPlatType(plato);
            this.loading = true;
        }
      });
    } else {
        plato._id=this.plat._id;
        var val = this.alertService.confirmation('question','Modifier','Voulez-vous modifier?');
        val.then((result) => {
          if (result.value) {
            this.updatePlatType(plato);
            this.loading = true;
        }
      });
    }
  }

  public createPlatType(plat: PlatType){
    this.platService.create(plat,this.token) .subscribe({
      next: (res) => {
        this.plats.push(res);
        this.alertService.success(`Plat enregistrer`);
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
  public updatePlatType(plat: PlatType){
    this.platService.update(plat,this.token) .subscribe({
      next: (res) => {
        this.findAll(this.user);
        this.alertService.success(`Plat modifier`);
        this.loading = false;
        this.formulaire = false;
        this.liste = true;
        this.loading = false;
        this.submitted = false;
        this.plat._id=null;
        this.form.reset();
      },
      error: (err) => {this.alertService.error(`Erreur de modification`);this.loading=false;this.error = true;this.submitted=false}
    });
    this.error=false;
  }
  public annuler(){
    this.formulaire = false;
    this.liste = true;  
    this.plat._id=null;
    this.submitted = false;
    this.info = false;
    this.form.reset();
  }
  public deletePlat(idPlatType){
    var val = this.alertService.confirmation('warning','Supprimer','Voulez-vous supprimer?');
    val.then((result) => {
      if (result.value) {
        this.loading = true;
        this.platService.delete(idPlatType,this.token) .subscribe({
          next: (res) => {
            this.loading = false;
            this.findAll(this.user);
            this.alertService.success(`Plat supprimer`);
          },
          error: (err) => {this.alertService.error(`Erreur de suppression`);this.loading=false}
        });
        
    }
    });
  }
  public infoPlat(id){
    this.clickButton(id);
    this.info=true;
  }
  public checkValue(plat,value){
    plat.visibility = value.currentTarget.checked;
    this.platService.update(plat,this.token) .subscribe({
      next: (res) => {
        // console.log(plat);
      },
      error: (err) => {this.alertService.error(`Erreur de suppression`);this.loading=false}
    });
  }
  /** fin fonction resto */
  /** fonction client */
  public  findVisible(){
    this.loading = true;
     this.platService.findVisible(this.token) .subscribe({
      next: (res) => {
        this.plats =  res;
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
  public async ajouter(plat){
    const { value: quantite } = await Swal.fire({
      title: 'Quantité du plat',
      input: 'number',
      inputLabel: 'Quantité',
      showCancelButton: true,
      confirmButtonColor: '#06768b',
      cancelButtonColor: 'red',
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez inseré un nombre!'
        }
      }
    })
    if (quantite) {
      Swal.fire(`Plat ajouter.`);
      var detail = {
        'plat':plat,
        'qty':quantite
      } as DetailType;
      var details = [];
      if (localStorage.getItem("details") === null) {
        details.push(detail);
      }else{
        details = JSON.parse(localStorage.getItem('details'));
        details.push(detail);
      }
      localStorage.setItem('details',JSON.stringify(details));
    }
  }
  /** fin fonction client */
}
