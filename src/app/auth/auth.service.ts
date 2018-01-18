import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../shared/user.model';
import {Script} from '../pages/scripts/script_model';

import {TokenService} from './token.service';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params,Router} from '@angular/router';

@Injectable()
export class AuthService implements OnInit{

  restAPILink: string = 'https://cors-anywhere.herokuapp.com/https://tranquil-escarpment-90924.herokuapp.com/';
  public isLoggedin: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router){}

  ngOnInit(){}

  registerUser(user: User){
    console.log(JSON.stringify(user));
    return this.http.post(this.restAPILink + 'users', JSON.parse(JSON.stringify(user)), {observe: 'response'})
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  loginUser(e: string, pw: string){
    var user: loginUser = {
      email: e,
      password: pw,
      username: "blank"
    };
    return this.http.post(this.restAPILink + 'users/login', JSON.parse(JSON.stringify(user)), {observe: 'response'})
    .subscribe(
      (res) => {
        console.log("Storing token: ");
        this.tokenService.store(res.headers.get('X-Auth'));
        this.isLoggedin.next(true);
        this.router.navigate(['/explore']);
      },
      (err) => console.log(err)
    );
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

    this.http.post(this.restAPILink + 'confirmation', JSON.parse(JSON.stringify(token)),{observe: 'response'}).subscribe(
      (res)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      }
    );
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
