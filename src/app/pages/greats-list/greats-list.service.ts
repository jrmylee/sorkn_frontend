import {Subject} from 'rxjs/Subject';
import {Film} from '../../shared/film.model';
import {GreatsList} from '../../shared/list.model';
import {ServerService} from '../../auth/server.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GreatsListService {
  greats: GreatsList[];
  loaded: Boolean=false;
  constructor(private server: ServerService){

  }
  lists : GreatsList[] = [
    
      
  ];

  getLists(){
    return this.server.getLists();
  }
  onClick(){
    console.log("zoop!");
  }
  addList(list: GreatsList){
    this.server.addList(list);
  }
  getList(id: string): Observable<GreatsList>{
    return this.server.getList(id);
  }
  getBackdrop(film: Film){
    return ("http://image.tmdb.org/t/p/original/" + film.poster_path);
  }
}
