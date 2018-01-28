import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {ServerService} from '../../../auth/server.service';

import {Film} from '../../../shared/film.model';
@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.component.html',
  styleUrls: ['./filmdetail.component.scss']
})
export class FilmdetailComponent implements OnInit {
  loaded: boolean = false;
  film: Film;
  constructor(private activatedRoute: ActivatedRoute, private serverService: ServerService) {
    activatedRoute.params.subscribe( (params:Params)=>{
      let title = params['id'];
      serverService.getCurrentMovieData(title).subscribe((film)=>{
        this.loaded = true;
        this.film = film;
      }, (err)=>{console.log(err)});

    }, (err)=>{console.log(err)});
  }

  ngOnInit() {
  }

}
