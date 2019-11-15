import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from './../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  newEvent: any;
  id: any;
  evs: any;
  updateEventForm: FormGroup;
  submitted: boolean = false;
  event: any;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {

    this.updateEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      length: ['', Validators.required],
      views: ['', Validators.required]
    });

    this.eventService.getEventById(this.id).subscribe((response) => {
      this.event = response;
      this.event.views = parseInt(this.event.views) + 1;
      this.updateEventForm = this.formBuilder.group({
        name: [this.event.name, Validators.required],
        type: [this.event.type, Validators.required],
        length: [this.event.length, Validators.required],
        views: [this.event.views, Validators.required]
      });
    });
  }

  updateEvent() {
    this.submitted = true;
    this.evs = this.updateEventForm.value;
    this.eventService.updateEvents(this.evs, this.id).subscribe((response) => {
      this.router.navigate(['/list-events']);
    },
    (error) => {
      console.log('Not updated', error);
    });
  }

}
