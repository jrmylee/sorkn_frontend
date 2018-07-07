import {User} from '../models/user.model';
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
  getUser(username: string){
    return this.serverService.getUser(username);
  }
  getUserScripts(username: string){
    return this.serverService.getScriptsByUser(username);
  }
  getUserLists(username: string){
    return this.serverService.getListsByUser(username);
  }
}
