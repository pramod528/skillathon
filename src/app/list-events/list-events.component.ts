import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './../services/event.service';
import { PagerService } from './../services/index'

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  events: any;
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(private eventService: EventService, private router: Router, private pagerService: PagerService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((response) => {
      this.events = Object.assign(response);
      this.setPage(1);
    })

  }
  setPage(page: number) {
    console.log(page);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.events.length, page);
    // get current page of items
    this.pagedItems = this.events.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  addEvent() {
    this.router.navigate(['add-events']);
  }
  removeEvent(id: string, index: number) {
    this.eventService.deleteEvent(id).subscribe(response => {
      if (response) {
        this.pagedItems.splice(index, 1);
      }
    })
  }
  onSearchChange(searchText) {
    if (searchText.length > 0) {
      this.pagedItems = this.events.filter(event => {
        return (event.name.toLowerCase()).startsWith(searchText.toLowerCase()) || (event.type.toLowerCase()).startsWith(searchText.toLowerCase());
      });
    } else {
      this.pagedItems = this.events;
    }
  }
}
