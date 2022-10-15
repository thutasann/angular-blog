import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-services/blog.service';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  dataSource: Observable<BlogEntriesPageable> = this.blogService.indexAll(1,10);
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  pageEvent: PageEvent;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let limit = event.pageSize;

    page = page + 1;
    this.dataSource = this.blogService.indexAll(page, limit);
  }

}
