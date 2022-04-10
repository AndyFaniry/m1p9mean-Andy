import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlatType } from 'api/collection/plat/plat.interface';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  private url: string = environment.url
  private  options = {
    headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : '',
    }
  };
  constructor(private http: HttpClient) { }

  public findAll(token,id): Observable<PlatType[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<PlatType[]>(`${this.url}/plat/resto/${id}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findVisible(token): Observable<PlatType[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get<PlatType[]>(`${this.url}/plat/visible`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findOne(token,id): Observable<PlatType>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get(`${this.url}/plat/${id}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public create(Plat: PlatType,token): Observable<PlatType>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.post(`${this.url}/plat/`,Plat,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public update(Plat: PlatType,token): Observable<PlatType>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.put(`${this.url}/plat/${Plat._id}`,Plat,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public delete(idPlat,token): Observable<boolean>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.delete(`${this.url}/plat/${idPlat}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
