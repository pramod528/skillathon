import { Injectable } from '@angular/core';
import { Events } from './../model/event';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string = 'http://localhost:5000';
  isAuthenticated: boolean = false;
  constructor(private http: HttpClient) { }

  // Add an event
  signIn(userDetails) {
    // TODO: Request to sign in
    return this.http.post(`${this.baseUrl}/login`,userDetails).pipe(
      map(response => <any[]>response),
      catchError(this.handleError));
  }

   // Add an event
   signUp(signupDetails) {
    // TODO: Request to sign up for first time
    return this.http.post(`${this.baseUrl}/signup`,signupDetails).pipe(
      map(response => <any[]>response),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public setAuthentication(value) {
    this.isAuthenticated = value;
  }
  public getAuthentication() {
		return this.isAuthenticated;
	}


}
