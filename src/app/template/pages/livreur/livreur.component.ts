import { Component, OnInit } from '@angular/core';
import { CardSettingsModel, DataSourceChangedEventArgs, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-kanban';
import { Commande, DetailType } from 'api/collection/commande/commande.interface';
import { CommandeService } from 'src/app/api/services/commande/commande.service';
@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.scss']
})
export class LivreurComponent implements OnInit {

  public commandes: Commande[];
  public data: Object[]=[];
  public loading: boolean=false ;
  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.findAllCommande();
  }
  public async findAllCommande(){
    this.loading=true;
    await this.commandeService.findAll(localStorage.getItem('token')).subscribe({
       next: (res) => {
        res.forEach(element => {
          var ob = {
            'header': 'Client: '+element.client.lastName+' '+element.client.firstName,
            'content' : 'Date: '+element.date+' <br /> Lieu: '+element.lieu_livraison,
            'etat': element.etat,
            '_id' : element._id
          };
          this.data.push(ob);
        });
        this.loading = false;
      },
      error: (err) => { this.loading = false;}
    });
  }
    public cardSettings: CardSettingsModel = {
        contentField: 'content',
        headerField: 'header'
    };
    public dataStateChange(state:  DataSourceChangedEventArgs): void {
      console.log(state.requestType);
  }
}
