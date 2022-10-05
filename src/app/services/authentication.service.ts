import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { LoginForm, RegisterForm, token } from 'src/types';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('/api/users/login',{
      email: loginForm.email,
      password: loginForm.password
    }).pipe(
      map((token: token) => {
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    )
  }

  register(registerForm: RegisterForm){
    return this.http.post<any>('/api/users/create', registerForm).pipe(
      map(user => user)
    )
  }

}
