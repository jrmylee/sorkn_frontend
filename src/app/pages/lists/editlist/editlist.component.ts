import { Component, OnInit, ViewChildren, ViewChild,ChangeDetectorRef } from '@angular/core';
import {SearchComponent} from '../../search/search.component';
import { SearchService } from '../../../nav/header/search.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subject ,  Observable } from 'rxjs';
import { Film } from '../../../models/film.model';
import { GreatsList } from '../../../models/list.model';
import { FormGroup, NgForm } from '@angular/forms';
import { FilmListService } from '../film-list.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.scss']
})
export class EditlistComponent implements OnInit {
  list: GreatsList;
  myForm: FormGroup;
  isLoggedIn: boolean;
  isDesktop: boolean = true;
  searchTerm = new Subject<string>();
  results: any[] = [];
  films: Film[] = [];
  displayedColumns = ['title', 'year'];
  dataSource = new MatTableDataSource(this.films);
  id: string="";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  greatslist: GreatsList;
  constructor( private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute,private listService: FilmListService) {
    this.activatedRoute.params.subscribe( (params:Params)=>{
      this.id = params['id'];
      listService.getList(this.id).subscribe(res=>{
        this.list = res;
        this.films = this.list.films;
        this.dataSource = this.dataSource = new MatTableDataSource(this.films);
      });

    }, (err)=>{console.log(err)});
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
  onSubmit(){
    this.greatslist =  {
      name: this.list.name,
      films: this.films,
      username: "",
      _id: ""
    };
    this.listService.patchList(this.id, this.greatslist).subscribe(obj=>{
      this.router.navigate(["/lists"]);
    });
  }
}
