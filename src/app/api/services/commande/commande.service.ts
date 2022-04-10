import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from 'api/collection/commande/commande.interface';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private url: string = environment.url
  private  options = {
    headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : '',
    }
  };
  constructor(private http: HttpClient) { }

  public findAll(token): Observable<Commande[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<Commande[]>(`${this.url}/commande/`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public findAllByClient(login,token): Observable<Commande[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<Commande[]>(`${this.url}/commande/client/${login}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findAllByResto(login,token): Observable<Commande[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<Commande[]>(`${this.url}/commande/resto/${login}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findAllByLivreur(login,token): Observable<Commande[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<Commande[]>(`${this.url}/commande/livreur/${login}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public findOne(token,id): Observable<Commande>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get(`${this.url}/commande/${id}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }


  public create(commande: Commande,token): Observable<Commande>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.post(`${this.url}/commande/`,commande,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public update(commande: Commande,token): Observable<Commande>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.put(`${this.url}/commande/${commande._id}`,commande,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public delete(idCommande,token): Observable<boolean>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.delete(`${this.url}/commande/${idCommande}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
