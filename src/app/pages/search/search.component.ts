import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../nav/header/search.service';
import { Subject } from 'rxjs/Subject';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoggedIn: boolean;
  isDesktop: boolean = true;
  searchTerm = new Subject<string>();
  results: any[] = [];
  constructor( private searchService: SearchService, private router: Router) {

    this.searchService.search(this.searchTerm).subscribe(results => {
      console.log(results);
      if(results.results != null){
        this.results = results.results;
      }else{
        this.results = [];
      }
    });
  }
  ngOnInit() {

  }
  clickSuggestion(film: any){
    this.searchTerm.next("");
    this.router.navigate(['/f', film.id]);
  }
}
