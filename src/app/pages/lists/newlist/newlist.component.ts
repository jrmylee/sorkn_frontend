import { Component, OnInit, ViewChildren, ViewChild,ChangeDetectorRef } from '@angular/core';
import {SearchComponent} from '../../search/search.component';
import { SearchService } from '../../../nav/header/search.service';
import { Router } from '@angular/router';
import { Subject ,  Observable } from 'rxjs';
import { Film } from '../../../models/film.model';
import { GreatsList } from '../../../models/list.model';
import { FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';
import { FilmListService } from '../film-list.service';

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
  displayedColumns = ['title', 'year'];
  dataSource = new MatTableDataSource(this.films);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  greatslist: GreatsList;
  constructor( private searchService: SearchService, private router: Router, private listService: FilmListService) {

    this.searchService.search(this.searchTerm).subscribe(results => {
      if(results.results != null){
        this.results = results.results;
      }else{
        this.results = [];
      }
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  clickSuggestion(film: any){
    this.searchTerm.next("");
    this.films.push(film);
    this.dataSource = new MatTableDataSource(this.films);
  }
  onSubmit(form: NgForm){
    const value = form.value;
    this.greatslist =  {
      name: value.title,
      films: this.films,
      username: "",
      _id: ""
    };
    this.listService.addList(this.greatslist).subscribe(obj=>{
      this.router.navigate(["/lists"]);
    });
  }
}
