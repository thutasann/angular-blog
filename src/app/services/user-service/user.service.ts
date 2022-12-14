import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'ethers/lib/utils';
import { catchError, concatAll, map, Observable, throwError } from 'rxjs';
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

  paginateByName(page: number, size: number, username: string): Observable<UserListData>{
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get('/api/users', {params}).pipe(
      map((userData: any) => userData),
      catchError(err => throwError(err))
    )
  }

  findOne(id: number): Observable<User>{
    return this.http.get('/api/users/' + id).pipe(
      map((user: User) => user)
    )
  }

  updateOne(user: User): Observable<User>{
    return this.http.put('/api/users/update/' + user.id, user);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/users/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
