import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class SearchService {
  apiKey: string = "4d6f4eb20f539c104e0b660866432365";
  baseUrl: string = "https://api.themoviedb.org/3/search/movie?api_key=" + this.apiKey +"&language=en-US&query=";
  constructor(private _http: HttpClient) { }

  search(terms: Observable<string>) {

    return terms.pipe(debounceTime(600),distinctUntilChanged(), switchMap(term=>this.searchEntries(term)));
  }
  searchEntries(term){
    let _URL = this.baseUrl + term;
    if(term.replace(/\s/g,'') === ''){
      return of(res => JSON.parse(JSON.stringify([])));
    }
    return this._http.get(_URL).pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
}
