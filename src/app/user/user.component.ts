import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';

import {UserService} from './user.service';
import {ServerService} from '../auth/server.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: User;
  loaded: boolean = false;

  constructor(private userService: UserService, private serverService: ServerService,
     private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedin){
      this.serverService.getCurrentUser().subscribe(
        (user)=>{
          this.currentUser = user;
          this.loaded = true;
        },
        (err)=>{console.log(err)});
    }
  }

  getCurrentUser(){
    if(this.loaded){
      return this.currentUser;
    }
    return null;
  }
}
