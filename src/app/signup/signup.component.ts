import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   // newEvent: Events = new Events();
   signUpDetails: any;
   signUpForm: FormGroup;
   submitted: boolean = false;
  constructor(private loginService:LoginService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phone:[''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp(){
    this.submitted = true;
    console.log('signup clicked one time');
    this.signUpDetails = this.signUpForm.value;
    if(this.signUpForm.valid){
      this.loginService.signUp(this.signUpDetails).subscribe(response => {
        this.router.navigate(['/login']);
        console.log('resgistred successfully',response);
      },
      (error) => {
        console.log('registration failed',error);
      });
    }
  }

}
