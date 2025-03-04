import { Injectable } from '@angular/core';
import { envUrl } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = envUrl + 'Login';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class HomeComponentService {

  constructor(private http:HttpClient) { }
  getLogin(): Observable<any> {
    return this.http.get(apiUrl + '/getLogin', httpOptions);
  }
}
