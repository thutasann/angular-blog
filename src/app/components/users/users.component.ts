import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserListData } from 'src/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  dataSource: UserListData;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(){
    this.userService.findAll(1, 10).pipe(
      tap(user => console.log(user)),
      map((userData: UserListData) => this.dataSource = userData)
    ).subscribe();
  }

  /**
   * Pagination
   */
  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    this.userService.findAll(page, size).pipe(
      map((userData: UserListData) => this.dataSource = userData)
    ).subscribe();

  }

}
