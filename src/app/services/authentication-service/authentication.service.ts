import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
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

  register(registerForm: RegisterForm){
    return this.http.post<any>('/api/users/create', registerForm).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean{
    const token: any = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

}
