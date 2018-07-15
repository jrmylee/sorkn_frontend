import { Component, OnInit, Input } from '@angular/core';
import {Film} from '../../models/film.model';
import {GreatsList} from '../../models/list.model';

import {GreatsListService} from './greats-list.service';
import {AuthService} from '../.././auth/auth.service';

import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import * as anime from 'animejs';

@Component({
  selector: 'app-greats-list',
  templateUrl: './greats-list.component.html',
  styleUrls: ['./greats-list.component.scss'],
})
export class GreatsListComponent implements OnInit {
  private subscription: Subscription;
  greats: Observable<GreatsList[]>;
  loaded: boolean = false;
  username: Observable<String>;
  isLoggedIn: Boolean = false;
  dataSource: MatTableDataSource<GreatsList>;
  displayedColumns = ['name'];

  constructor(private greatsListService: GreatsListService, private authService: AuthService,private router: Router) {
    this.greats = greatsListService.getLists().map(obj=>{
      this.loaded = true;
      return obj.slice(0,4);
    }).catch(err=>{
      return Observable.throw(err)
    });
    authService.isLoggedIn().subscribe(
      value =>{
        this.isLoggedIn = value;
        if(this.isLoggedIn){
          greatsListService.getMyLists().subscribe(lists=>{
            this.dataSource = new MatTableDataSource<GreatsList>(lists);
          });
        }
      }
    );
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

  clickList(list: GreatsList){
    this.router.navigate(['/l/' + list._id]);
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackdrop(film);
  }

}
