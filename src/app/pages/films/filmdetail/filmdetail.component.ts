import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {ServerService} from '../../../auth/server.service';

import {Film} from '../../../models/film.model';
import { Credits } from '../../../models/cast.model';
import { Observable } from 'rxjs/Observable';
import { FilmService } from '../film.service';
import { NavService } from '../../../nav/nav.service';
@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.component.html',
  styleUrls: ['./filmdetail.component.scss']
})
export class FilmdetailComponent implements OnInit {
  loaded: boolean = false;
  film: Film;
  credits: Observable<Credits>;
  title: string;
  script: Object;
  constructor(private activatedRoute: ActivatedRoute, private serverService: ServerService, private filmService: FilmService, private navService: NavService) {
    activatedRoute.params.subscribe( (params:Params)=>{
      this.navService.load();
      let id = params['id'];
      serverService.getMovieData(id).subscribe((film)=>{
        this.loaded = true;
        this.film = film;
        this.title = film.title;
        this.onScriptTab();

      }, (err)=>{console.log(err)});

      this.credits = serverService.getMovieCast(id);
    }, (err)=>{console.log(err)});
  }

  ngOnInit() {
  }

  getBackdrop(){
    return "http://image.tmdb.org/t/p/original/" + this.film.backdrop_path;
  }
  getDirector(){
    
  }
  onScriptTab(){
    this.formatString();
    this.filmService.getFilmScript(this.title).subscribe((obj)=>{
      this.script = obj;
      this.navService.noload();
    },(err)=>{
      this.navService.noload();
    });
    
  }
  formatString(){
    this.title = this.title.replace(":", "");
    if(this.title.substring(0,4) == "the "){
      this.title = this.title.substring(4, this.title.length) + ", The";
    }
  }
}
