import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from './../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  // newEvent: Events = new Events();
  newEvent: any;
  eventsForm: FormGroup;
  types:any[] = [];
  submitted:boolean = false;
  constructor(private eventService: EventService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.eventsForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      length: ['', Validators.required]
    });
    this.types = ['event1','event2','event3'];
  }
  
  addEvent() {
    this.submitted = true;
    console.log('save clicked one time');
    this.eventsForm.value.views = 0;
    this.newEvent = this.eventsForm.value;
    if(this.eventsForm.valid){
      this.eventService.addEvent(this.newEvent).subscribe(response => {
        this.router.navigate(['/list-events']);
        console.log('event added successfully',response);
      },
      (error) => {
        console.log('event adding failed',error);
      });
    }
  }
  
}
