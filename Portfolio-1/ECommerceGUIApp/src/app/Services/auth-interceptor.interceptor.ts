import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { inject } from '@angular/core';



export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;
  const tokenStorageService=inject(TokenStorageService);
  const jwtToken = tokenStorageService.getTokenFromCache();
  console.log("jwt--"+jwtToken);
  let authReq=req;
  if(jwtToken){
    authReq= req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
    });
    console.log("Authorization header set:", authReq.headers.get('Authorization')); // Debugging line
  }

  return next(authReq);
};
