import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User, UserListData } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(page: number, size: number): Observable<UserListData>{
    let params = new HttpParams();
    params =  params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get('/api/users', {params}).pipe(
      map((userData: any) => userData),
      catchError(err => throwError(err))
    )
  }
}
