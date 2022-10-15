import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-services/blog.service';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent {

  @Input() blogEntries: any;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  // dataSource: Observable<BlogEntriesPageable> = this.blogService.indexAll(1,10);
  pageEvent: PageEvent;

  constructor() { }

  // ngOnInit(): void {
  // }

  onPaginateChange(event: PageEvent){
    event.pageIndex = event.pageIndex + 1;
    this.paginate.emit(event);
    // this.dataSource = this.blogService.indexAll(page, limit);
  }

}
