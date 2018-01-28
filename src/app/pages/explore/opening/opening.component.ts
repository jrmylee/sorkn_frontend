import { Component, OnInit } from '@angular/core';

import {Film} from '../../../shared/film.model';

import {ServerService} from '../../../auth/server.service';

import * as anime from 'animejs';
@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss']
})
export class OpeningComponent implements OnInit {
  films: Film[] = [];
  loaded: boolean = false;


  constructor(private serverService: ServerService) {
    this.serverService.getIndieFilmTitle().subscribe((movies)=>{
      for(var i = 0; i < movies.length; i++){
        if(movies[i]!=null){
          this.serverService.getCurrentMovieData(movies[i].title).subscribe((res)=>{
            if(res!=null){
              this.films.push(res);
            }
          },(err)=>{console.log(err)});
        }
        this.loaded = true;
      }
    },(err)=>{
      console.log(err);
    });

  }
  ngAfterViewInit() {
    var path = anime.path('#motionPath path');

    var motionPath = anime({
      targets: '#motionPath .el',
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: 2000,
      loop: true
    });

  }
  ngOnInit() {
  }

}
