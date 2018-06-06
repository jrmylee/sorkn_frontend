import { Component, OnInit, ViewChildren } from '@angular/core';
import {SearchComponent} from '../../search/search.component';
import { SearchService } from '../../../nav/header/search.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Film } from '../../../shared/film.model';
import { GreatsList } from '../../../shared/list.model';
import { FormGroup, NgForm } from '@angular/forms';
import { GreatsListService } from '../greats-list.service';
@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.scss']
})
export class NewlistComponent implements OnInit {
  myForm: FormGroup;
  isLoggedIn: boolean;
  isDesktop: boolean = true;
  searchTerm = new Subject<string>();
  results: any[] = [];
  films: Film[] = [];
  greatslist: GreatsList;
  constructor( private searchService: SearchService, private router: Router, private listService: GreatsListService) {

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
    this.films.push(film);
  }
  onSubmit(form: NgForm){
    const value = form.value;
    console.log(value);
    this.greatslist =  {
      name: value.title,
      films: this.films,
      username: "",
      _id: ""
    };
    console.log(this.greatslist);
    this.listService.addList(this.greatslist);
    this.router.navigate(["/lists"]);
  }
}
