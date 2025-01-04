import { Injectable } from '@angular/core';
import NodeCache from 'node-cache';
const myCache = new NodeCache();

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  readonly jwtToken = 'auth-token';

  public saveToken(token: string): void {
    console.log("inside token-storage jwt-"+token);
    this.saveTokenInCache(token);
  }
  public getToken(): string | null {
    const token = this.getCacheToken();
 
    if (token) {
      return token;
    }
    return null;
  }
 
  public saveTokenInCache(token: string): void {
    console.log(token)
    myCache.del('jwtToken');
    myCache.set('jwtToken', token);
  }
 
  public getTempToken(): string | any {
    const token = window.sessionStorage.getItem(this.jwtToken);
 
    if (token) {
      return token;
    }
    return null;
  }
 
  public getCacheToken(): any {
    var jwt = myCache.get('jwtToken');
    return jwt;
  }
}