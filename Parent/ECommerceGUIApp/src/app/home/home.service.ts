import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envUrl } from '../../environments/environment';

const apiUrl = envUrl + 'Login';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
  getLogin(): Observable<any> {
    return this.http.get(apiUrl + '/getLogin', httpOptions);
  }

  getJwtData(): Observable<any> {
    return this.http.get(apiUrl + '/jwtData', httpOptions);
  }
}
