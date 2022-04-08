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

  public findOne(token,id): Observable<Resto>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get(`${this.url}/resto/${id}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public create(resto: Resto,token): Observable<Resto>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.post(`${this.url}/resto/`,resto,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public update(resto: Resto,token): Observable<Resto>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.put(`${this.url}/resto/${resto._id}`,resto,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public delete(idResto,token): Observable<boolean>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.delete(`${this.url}/resto/${idResto}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
