import { Injectable } from '@angular/core';
import { Events } from './../model/event';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  lastId = 0;
  events: Events[] = [];

  baseUrl:string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  // Add an event
  addEvent(event) {
    // TODO: Request to create event
    return this.http.post(`${this.baseUrl}/add`,event).pipe(
      map(response => <Events[]>response),
      catchError(this.handleError));
  }

  // Get all events
  getEvents(): Observable<Events[]>  {
    // TODO: Request to get all events
    return this.http.get(`${this.baseUrl}/getAll`).pipe(
      map(response => <Events[]>response),
      catchError(this.handleError));
  }
  
  // Get event by ID
  getEventById(id: string):Observable<Events[]> {
    // TODO: Request to get event by ID
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map(response => <Events[]>response),
      catchError(this.handleError));
  }

  updateEvents(e: any, id: string) {
    // TODO: Request to update events
    return this.http.put(`${this.baseUrl}/update/${id}`, e).pipe(
      map(response => <Events[]>response),
      catchError(this.handleError));
  }

  deleteEvent(id: string) {
    // TODO: Request to update events
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      map(response => <Events[]>response),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

}
