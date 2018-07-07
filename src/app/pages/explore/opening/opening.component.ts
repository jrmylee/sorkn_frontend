import { Component, OnInit } from '@angular/core';

import {Film} from '../../../models/film.model';

import {ServerService} from '../../../auth/server.service';

import * as anime from 'animejs';
import * as movieInfo from 'movie-info';
import { Subject, BehaviorSubject } from 'rxjs';
import { NavService } from '../../../nav/nav.service';
@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss']
})
export class OpeningComponent implements OnInit {
  films: Film[] = [];
  loaded: boolean = false;


  constructor(private serverService: ServerService, private navService: NavService) {
    // this.serverService.getIndieFilmTitle().subscribe((movies)=>{
    //   console.log(movies);
    //   for(var i = 0; i < movies.length; i++){
    //     if(movies[i]!=null){
    //       this.serverService.getMovieDataFromTitle(movies[i].title).subscribe((res)=>{
    //         if(res!=null){
    //           this.films.push(res);
    //         }
    //       },(err)=>{console.log(err)});
    //     }
    //     this.loaded = true;
    //     this.navService.noload();
    //   }
    // },(err)=>{
    //   console.log(err);
    // });
}
ngAfterViewInit() {

}
  ngOnInit() {
  }

}
