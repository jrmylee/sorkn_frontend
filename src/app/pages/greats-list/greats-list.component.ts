import { Component, OnInit, Input } from '@angular/core';
import {Film} from '../../shared/film.model';
import {GreatsList} from '../../shared/list.model';
import {GreatsListService} from './greats-list.service';

import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-greats-list',
  templateUrl: './greats-list.component.html',
  styleUrls: ['./greats-list.component.scss'],
})
export class GreatsListComponent implements OnInit {
  private subscription: Subscription;
  greats: Observable<GreatsList[]>;
  loaded: Boolean= false;
  username: Observable<String>;
  constructor(private greatsListService: GreatsListService) {
    this.greats = greatsListService.getLists();
    
  }

  ngOnInit() {
  }
  onClick(){
    this.greatsListService.onClick();
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackdrop(film);
  }

}
