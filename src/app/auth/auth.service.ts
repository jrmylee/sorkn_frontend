import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../models/user.model';
import {Script} from '../pages/scripts/script_model';

import {TokenService} from './token.service';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class AuthService implements OnInit{

  restAPILink: string = 'http://34.209.77.190:3000/';
  public isLoggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router){
      if(this.tokenService.retrieve() !=='no token found'){
        this.isLoggedin.next(true);
      }
    }

  ngOnInit(){
  }

  registerUser(user: User){
    return this.http.post(this.restAPILink + 'users', user, {observe: 'response', responseType: 'text'});
  }

  loginUser(e: string, pw: string){
    var user: loginUser = {
      email: e,
      password: pw,
      username: "blank"
    };

    return this.http.post(this.restAPILink + 'users/login', JSON.parse(JSON.stringify(user)), {observe: 'response'});
  }

  isLoggedIn(){
    return this.isLoggedin;
  }

  logoutUser(){
    this.tokenService.delete();
    this.isLoggedin.next(false);
    this.router.navigate(['/explore']);

  }

  verifyUser(url: string){
    var token: Token = {
      token: url
    };

    return this.http.post(this.restAPILink + 'confirmation', JSON.parse(JSON.stringify(token)),{observe: 'response', responseType: "text"});
  }

  storeToken(xauth: string){
    this.tokenService.store(xauth);
  }
}
export interface Token{
  token: string;
}

export interface loginUser{
  email: string;
  password: string;
  username: string;
}
