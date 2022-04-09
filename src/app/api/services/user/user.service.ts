import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, AuthenticationResponse } from 'api/collection/user/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.url
  private  options = {
    headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization' : '',
    }
  };
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<AuthenticationResponse>{ 
    return this.http.post<AuthenticationResponse>(`${this.url}/user/login`, user).pipe(map((resp:any) => {
      return resp.data;
    }))
  } 
  public signup(user: User): Observable<AuthenticationResponse>{
    user.userType ={'name':'client'} ;
    return this.http.post<AuthenticationResponse>(`${this.url}/user/signup`, user).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public checkProfi(user: User): string{
    var url = "" ;
    if(user.userType.name === "admin"){
      url = "admin/";
    }
    if(user.userType.name === "client"){
      url = "client/";
    }
    if(user.userType.name === "restaurant"){
      url = "restaurant/";
    }
    if(user.userType.name === "livreur"){
      url = "livreur/";
    }
    return url;
  }
  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/user/`)
  }
  public find(){
    return this.http.get(`${this.url}/user/`).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findAllLivreur(token): Observable<User[]>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get(`${this.url}/user/livreur`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public findOne(token,id): Observable<User>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.get(`${this.url}/user/${id}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
  public create(user: User,token): Observable<User>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.post(`${this.url}/user/`,user,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public update(user: User,token): Observable<User>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.put(`${this.url}/user`,user,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }

  public delete(iduser,token): Observable<boolean>{
    this.options.headers.Authorization='Bearer '+token;
    return this.http.delete(`${this.url}/user/${iduser}`,this.options).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
