import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Commande, DetailType } from 'api/collection/commande/commande.interface';
import { User } from 'api/collection/user/user.interface';
import { AlertService } from 'src/app/api/services/alert/alert.service';
import { CommandeService } from 'src/app/api/services/commande/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande-content',
  templateUrl: './commande-content.component.html',
  styleUrls: ['./commande-content.component.scss']
})
export class CommandeContentComponent implements OnInit {

  public commandeEnregistrer: Commande[];
  public commandeEncours: DetailType[];
  public loading: boolean = false;
  public token: string = localStorage.getItem('token');
  public user = JSON.parse(localStorage.getItem('user')) as User;
  constructor(private alertService: AlertService,private commandeService: CommandeService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(this.user.userType.name === 'client'){
      this.findCommandeEnregistrer();
      this.commandeEncours  = JSON.parse(localStorage.getItem('details')) as DetailType[];
    }
    if(this.user.userType.name === 'restaurant'){
      this.findCommandeResto();
    }
    if(this.user.userType.name === 'admin'){
      this.findCommandeAll();
    }
  }
  public findCommandeAll(){
    this.loading=true;
    this.commandeService.findAll(localStorage.getItem('token')).subscribe({
       next: (res) => {
        this.commandeEnregistrer = res;
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
  public findCommandeEnregistrer(){
    this.loading=true;
    this.commandeService.findAllByClient(this.user.login,localStorage.getItem('token')).subscribe({
       next: (res) => {
        this.commandeEnregistrer = res;
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
  public findCommandeResto(){
    this.loading=true;
    this.commandeService.findAllByResto(this.user.login,localStorage.getItem('token')).subscribe({
       next: (res) => {
        this.commandeEnregistrer = res;
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
  public async enregisterEncours(){
    const { value: lieu } = await Swal.fire({
      title: 'Lieux de livraison',
      input: 'text',
      inputLabel: 'Lieu',
      showCancelButton: true,
      confirmButtonColor: '#06768b',
      cancelButtonColor: 'red',
      confirmButtonText: 'OK',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez inseré un lieu!'
        }
      }
    });
    if(lieu){
      var details =  JSON.parse(localStorage.getItem('details')) as DetailType[];
      var date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      var commande: Commande = {
        'date': date,
        'etat': 'commande',
        'detail': details,
        'client': this.user,
        'lieu_livraison': lieu,
        'livreur':null
      } ;
      this.loading = true;
      this.commandeService.create(commande,this.token) .subscribe({
        next: (res) => {
          this.alertService.success(`Commande enregistrer`);
          this.loading = false;
          this.commandeEnregistrer.push(commande);
          this.commandeEncours = null;
          localStorage.removeItem('details');
        },
        error: (err) => {this.alertService.error(`Erreur d'enregistrent`);this.loading=false}
      });
    }
  }
  public deleteCommandeEncours(plat){
    var val = this.alertService.confirmation('warning','Supprimer','Voulez-vous supprimer?');  
        val.then((result) => {
          if (result.value) {
            this.commandeEncours.forEach((item,index)=>{
              if(item.plat==plat){
                this.commandeEncours.splice(index, 1);
              }
            });
            localStorage.setItem('details',JSON.stringify(this.commandeEncours));
        }
      });
  }
  public detailCommande(commande){
    var html= "<center><table class='table table-striped align-middle'>"+
    "<tr>"+
      "<th>Plat</th>"+
      "<th>Restaurant</th>"+
      "<th>Quantite</th>"+
      "<th>Prix</th>"+
      "<th>Total</th>"+
    "</tr>";
    var total = 0;
    commande.detail.forEach(element => {
      var detail = "<tr>"+
      "<td>"+element.plat.name+"</td>"+
      "<td>"+element.plat.resto.user.lastName+"</td>"+
      "<td>"+element.qty+"</td>"+
      "<td>"+element.plat.pV+" Ar</td>"+
      "<td>"+(element.plat.pV*element.qty)+" Ar</td>"+
      "</tr>";
      total +=  (element.plat.pV*element.qty);
      html += detail;
    });
    html+= "<tr>"+
      "<td>"+"<td>"+
      "<td>"+"</td>"+
      "<td>"+"</td>"+
      "<td>"+total+" Ar</td>"+
      "</tr>";
    html+="</table></center>";
    Swal.fire({
      title: 'Détails commande',
      width: 900,
      html: html,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'OK'
    })
  }
  public deleteCommandeTerminer(idcommande){
    var val = this.alertService.confirmation('warning','Supprimer','Voulez-vous supprimer?');  
        val.then((result) => {
          if (result.value) {
            this.loading = true;
            this.commandeService.delete(idcommande,this.token) .subscribe({
              next: (res) => {
                this.loading = false;
                this.findCommandeEnregistrer();
                this.alertService.success(`Commande supprimer`);
              },
              error: (err) => {this.alertService.error(`Erreur de suppression`);this.loading=false}
            });
        }
      });
  }
  public changeEtat(commande: Commande){
    commande.etat = 'en cours';
    var val = this.alertService.confirmation('question','Modifier','Voulez-vous modifier?');  
    val.then((result) => {
      if (result.value) {
        this.loading = true;
        this.commandeService.update(commande,this.token).subscribe({
          next: (res) => {
            this.loading = false;
            this.findCommandeResto();
            this.alertService.success(`Etat modifier`);
          },
          error: (err) => {this.alertService.error(`Erreur de modification`);this.loading=false}
        });
    }
  });
  }
}
