import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserListData } from 'src/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  filterValue: string = "";
  dataSource: UserListData;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(){
    this.userService.findAll(1, 10).pipe(
      map((userData: UserListData) => this.dataSource = userData)
    ).subscribe();
  }

  /**
   * Pagination
   */
  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    if(this.filterValue == null){
      page = page + 1;
      page = page + 1;
      this.userService.findAll(page, size).pipe(
        map((userData: UserListData) => this.dataSource = userData)
      ).subscribe();
    }
    else{
      this.userService.paginateByName(page, size, this.filterValue).pipe(
        map((userData: UserListData) => this.dataSource = userData)
      ).subscribe();
    }

  }


  /**
   * Filter by name
   */
  findByName(username: string) {
    console.log(username);
    this.userService.paginateByName(0, 10, username).pipe(
      map((userData: UserListData) => this.dataSource = userData)
    ).subscribe()
  }


  /**
   * View Detail
   */
  navigateToProfile(id: any){
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }
}
