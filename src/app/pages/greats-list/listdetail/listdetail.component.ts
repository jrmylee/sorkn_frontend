import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {Film} from '../../../shared/film.model';
import {GreatsList} from '../../../shared/list.model';
import {GreatsListService} from '.././greats-list.service';

import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-listdetail',
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.scss']
})
export class ListdetailComponent implements OnInit {
  list$: Observable<GreatsList>;
  constructor(private listService: GreatsListService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params:Params)=>{
      let id = params['id'];
      this.list$ = listService.getList(id);

    }, (err)=>{console.log(err)});
  }

  ngOnInit() {
  }
  getBackdrop(film: Film){
    return this.listService.getBackdrop(film);
  }
}
