import {User} from '../shared/user.model';
import {ServerService} from '../auth/server.service';
import {AuthService} from '../auth/auth.service';

import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class UserService implements OnInit{
  currentUser: User;

  constructor(private serverService: ServerService,
     private authService: AuthService){

  }

  ngOnInit(){

  }
  getUser(){
    return this.serverService.getCurrentUser();
  }
}
