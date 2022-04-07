import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resto } from 'api/collection/resto/resto.interface';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url: string = environment.url
  private  options = {
    headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : '',
    }
  };
  constructor(private http: HttpClient) { }

  public findAll(token): Observable<Resto[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<Resto[]>(`${this.url}/resto/`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public find(){
    return this.http.get(`${this.url}/resto/`).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
