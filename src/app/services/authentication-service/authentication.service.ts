import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { LoginForm, RegisterForm, token } from 'src/types';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('/api/users/login',{
      email: loginForm.email,
      password: loginForm.password
    }).pipe(
      map((token: token) => {
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout(){
    localStorage.removeItem(JWT_NAME);
  }

  register(registerForm: RegisterForm){
    return this.http.post<any>('/api/users/create', registerForm).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean{
    const token: any = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt: any) => jwt.user.id)
      )
    ));
  }

}
