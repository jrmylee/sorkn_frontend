import {Subject,  Observable ,  BehaviorSubject } from 'rxjs';
import {Film} from '../../models/film.model';
import {GreatsList} from '../../models/list.model';
import {ServerService} from '../../auth/server.service';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

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
  
  getMyLists(){
    return this.server.getMyLists();
  }
  
  addList(list: GreatsList){
    return this.server.addList(list);
  }

  deleteList(id: string){
    return this.server.deleteList(id);
  }
  patchList(id: string, list: GreatsList){
    return this.server.patchList(id, list);
  }
  getList(id: string): Observable<GreatsList>{
    return this.server.getList(id);
  }
  getBackdrop(film: Film){
    return ("https://image.tmdb.org/t/p/original/" + film.poster_path);
  }
  getBackground(film: Film){
    return ("https://image.tmdb.org/t/p/original/" + film.backdrop_path);
  }
  getCurrentUser(): Observable<User>{
    return this.server.getCurrentUser();
  }
}
