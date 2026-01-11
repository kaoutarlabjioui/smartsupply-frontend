import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_URL = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient){}

  login(credentials: {email:string; password: string ; }): Observable<any>{
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response=>{
        if(response?.accessToken){
          localStorage.setItem('token',response.accessToken);
        }
      })
    )
  }



}
