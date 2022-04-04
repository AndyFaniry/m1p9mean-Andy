import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDto, LoginResponseDto } from 'src/app/models/dto/login.dto';
import { User } from 'api/collection/user/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.url
  
  constructor(private http: HttpClient) { }

  public login(loginDto: LoginDto): Observable<LoginResponseDto>{ 
    return this.http.post<LoginResponseDto>(`${this.url}/user/login`, loginDto) 
  } 

  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/user/`)
  }
  public find(){
    return this.http.get(`${this.url}/user/`).pipe(map((resp:any) => {
      return resp.data;
    }))
  }
}
