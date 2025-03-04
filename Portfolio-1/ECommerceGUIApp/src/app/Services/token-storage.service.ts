import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


import NodeCache from 'node-cache';
const myCache = new NodeCache();
const jwtToken="service_id";

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  readonly jwtToken = 'auth-token';
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  
  saveToken(token: string): void {
    this.storage.set('authToken', token);
  }

  getToken(): string | null {
    return this.storage.get('authToken');
  }

  removeToken(): void {
    this.storage.remove('authToken');
  }

  public saveTokenInCache(token: any): void {
    // debugger;
    console.log(token);
    myCache.del('jwtToken');
    myCache.set('jwtToken', token);
  }

  public getTokenFromCache(): any {
    return myCache.get('jwtToken');
  }
  
  public getTempToken(): any {
    const token = window.sessionStorage.getItem(jwtToken);
 
    if (token) {
      return token;
    }
    return null;
  }
}
