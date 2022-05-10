/*********************************************************************************
* WEB422 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Henry Tao Student ID: 118375203 Date: 04/10/2022
*
* Angular App (Deployed) Link: https://github.com/viciouspotato-coder/WEB422-final-assignment/tree/master
*
* User API (Heroku) Link: https://quiet-taiga-79557.herokuapp.com/api/user
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web422-a6';
  searchString: string = '';
  token: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
