import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserExist: any;
  constructor(private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem("userInfo")) {
      this.isUserExist = JSON.parse(localStorage.getItem("userInfo"));
    }
  }
  logout() {
    localStorage.removeItem("userInfo");
    this.router.navigate(['/login']);

  }
}
