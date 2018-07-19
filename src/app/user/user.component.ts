import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';

import {UserService} from './user.service';
import {ServerService} from '../auth/server.service';
import {AuthService} from '../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Script } from '../pages/scripts/script_model';
import { GreatsList } from '../models/list.model';
import { FilmListService } from '../pages/lists/film-list.service';
import { Film } from '../models/film.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: User;
  loaded: boolean = false;
  lists: GreatsList[];

  scripts: Observable<Script[]>;
  scriptData: MatTableDataSource<Script>;
  displayedColumns = ['name'];

  constructor(private userService: UserService, private serverService: ServerService,
     private authService: AuthService,private route: ActivatedRoute,
     private router: Router, private greatsListService: FilmListService) { }

  ngOnInit() {
    this.route.params.subscribe( (params:Params)=>{
      let username = params['id'];
      this.userService.getUser(username).subscribe(user=>{
        this.currentUser = user;
      });
      this.userService.getUserLists(username).subscribe(list=>{
        this.lists = list;
      });
      this.scripts = this.userService.getUserScripts(username);
      this.userService.getUserScripts(username).subscribe(scripts=>{
        this.scriptData = new MatTableDataSource<Script>(scripts);
      })
    }, (err)=>{console.log(err)});
  }

  clickScript(script: Script){
    this.router.navigate(['/s',script._id]);
  }

  getCurrentUser(){
    if(this.loaded){
      return this.currentUser;
    }
    return null;
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackdrop(film);
  }

}
