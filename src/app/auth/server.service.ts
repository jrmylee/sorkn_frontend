import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../shared/user.model';
import {Script} from '../pages/scripts/script_model';

import {TokenService} from './token.service';
@Injectable()
export class ServerService implements OnInit{
  restAPILink: string = 'https://cors-anywhere.herokuapp.com/https://tranquil-escarpment-90924.herokuapp.com/';
  isLoggedin: boolean;
  constructor(private http: HttpClient, private tokenService: TokenService){
    this.isLoggedin = this.tokenService.retrieve()!=='no token found';
    console.log(this.isLoggedin)
  }
  ngOnInit(){}

  getCurrentUser(){
    return this.http.get<User>(this.restAPILink + 'users/me', {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }

  addScript(script: Script){
    console.log(JSON.stringify(script));
    return this.http.post(this.restAPILink + 'scripts', JSON.parse(JSON.stringify(script)), {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve())),
    })
    .subscribe(
      (res)=>{
      console.log(res);
    },
      (err)=>{
      console.log(err);
    }
  );
  }

  deleteScript(script: Script){
    return this.http.delete(this.restAPILink + 'scripts/' + script._id, {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    }).subscribe(
      (res)=>{console.log("Deleted " + res)},
      (err)=>{console.log(err)});
  }

  getScripts(){
    console.log("getting");
    return this.http.get<Script[]>(this.restAPILink + 'scripts', {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }


}
