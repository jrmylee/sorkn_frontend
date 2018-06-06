import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../shared/user.model';
import {Script} from '../pages/scripts/script_model';
import {Film} from '../shared/film.model';
import {GreatsList} from '../shared/list.model';

import {TokenService} from './token.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ServerService implements OnInit{
  restAPILink: string = 'https://cors-anywhere.herokuapp.com/https://tranquil-escarpment-90924.herokuapp.com/';
  movieAPILink: string = 'https://api.themoviedb.org/3/movie/';
  apiKey: string = "4d6f4eb20f539c104e0b660866432365";

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

  addList(list: GreatsList){
    console.log(JSON.stringify(list));
    return this.http.post(this.restAPILink + 'filmlist', JSON.parse(JSON.stringify(list)), {
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

  getList(id: string): Observable<GreatsList>{
    return this.http.get<GreatsList>(this.restAPILink + 'filmlist/' + id);
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

  getLists(){
    return this.http.get<GreatsList[]>(this.restAPILink + 'filmlist');
  }

  getIndieFilmTitle(){
    return this.http.get<Film[]>(this.restAPILink + 'indiefilms');
  }
  getMovieData(id: string){
    return this.http.get<Film>(this.movieAPILink+id+'?api_key=' + this.apiKey +'&language=en-US');
  }
  getMovieDataFromTitle(title: string){
    return this.http.get<Film>(this.restAPILink + '/moviedetails/'+title);
  }
}
