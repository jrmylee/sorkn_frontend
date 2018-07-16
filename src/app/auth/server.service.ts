import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {User} from '../models/user.model';
import {Script} from '../pages/scripts/script_model';
import {Film} from '../models/film.model';
import {GreatsList} from '../models/list.model';

import {TokenService} from './token.service';
import { Credits } from '../models/cast.model';
@Injectable()
export class ServerService implements OnInit{
  restAPILink: string = 'https://blackasmidnight.com:8443/';
  movieAPILink: string = 'https://api.themoviedb.org/3/movie/';
  apiKey: string = "4d6f4eb20f539c104e0b660866432365";

  isLoggedin: boolean;
  constructor(private http: HttpClient, private tokenService: TokenService){
    this.isLoggedin = this.tokenService.retrieve()!=='no token found';
  }
  ngOnInit(){}

  getUser(username: string){
    return this.http.get<User>(this.restAPILink + 'users/'+username);
  }
  getCurrentUser(){
    return this.http.get<User>(this.restAPILink + 'users/me', {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }

  addScript(script: Script){
    return this.http.post(this.restAPILink + 'scripts', JSON.parse(JSON.stringify(script)), {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve())),
    });
  }

  addList(list: GreatsList){
    return this.http.post(this.restAPILink + 'filmlist', JSON.parse(JSON.stringify(list)), {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve())),
    });
  }

  deleteList(id: string){
    return this.http.delete<GreatsList>(this.restAPILink + 'filmlist/' + id, {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve())),
    }
    );
  }

  patchList(id:string, list: GreatsList){
    console.log(this.restAPILink + 'filmlist/' + id);
    return this.http.patch<GreatsList>(this.restAPILink + 'filmlist/' + id,list, {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve())),
    });
  }

  getList(id: string): Observable<GreatsList>{
    return this.http.get<GreatsList>(this.restAPILink + 'filmlist/' + id);
  }

  getScript(id: string): Observable<Script>{
    return this.http.get<Script>(this.restAPILink + "scripts/" + id);
  }

  getPublicScript(id: string): Observable<Script>{
    return this.http.get<Script>(this.restAPILink + 'scripts/public/' + id);
  }

  deleteScript(id: string){
    return this.http.delete(this.restAPILink + 'scripts/' + id, {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }

  getScripts(){
    return this.http.get<Script[]>(this.restAPILink + 'scripts', {
      headers: new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }

  getScriptsByUser(username: string){
    return this.http.get<Script[]>(this.restAPILink + "user/scripts/" + username);
  }

  getListsByUser(username: string){
    return this.http.get<GreatsList[]>(this.restAPILink + "user/filmlist/" + username);
  }

  getPublicScripts(){
    return this.http.get<Script[]>(this.restAPILink + 'scripts/all');
  }

  getLists(){
    return this.http.get<GreatsList[]>(this.restAPILink + 'filmlist');
  }

  getMyLists(){
    return this.http.get<GreatsList[]>(this.restAPILink + 'filmlist/me', {
      headers:new HttpHeaders().set('x-auth', JSON.parse(this.tokenService.retrieve()))
    });
  }
  getIndieFilmTitle(){
    return this.http.get<Film[]>(this.restAPILink + 'indiefilms');
  }

  getMovieData(id: string){
    return this.http.get<Film>(this.movieAPILink+id+'?api_key=' + this.apiKey +'&language=en-US');
  }

  getMovieCast(id: string){
    return this.http.get<Credits>(this.movieAPILink+id+'/credits?api_key=' + this.apiKey + '&language=en-US');
  }
  getMovieDataFromTitle(title: string){
    return this.http.get<Film>(this.restAPILink + 'moviedetails/'+title);
  }

  getProfilePic(){
    
  }
}
