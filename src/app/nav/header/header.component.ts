import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef, HostListener} from '@angular/core';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import * as Rx from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import {ChangeDetectorRef} from '@angular/core';

import {UserService} from '../../user/user.service';
import {AuthService} from '../.././auth/auth.service';
import {ServerService} from '../.././auth/server.service';
import {NavService} from '.././nav.service';
import {SearchService} from './search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isDesktop: boolean = true;
  searchTerm = new Subject<string>();
  results: any[] = [];
  constructor(private authService: AuthService, private userService: UserService,
     private serverService: ServerService, private navService: NavService, private router: Router,
   private cdr: ChangeDetectorRef, private searchService: SearchService) {
    authService.isLoggedIn().subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    );
    this.searchService.search(this.searchTerm).subscribe(results => {
      console.log(results);
      if(results.results != null){
        this.results = results.results;
      }else{
        this.results = [];
      }
    });
  }
  ngOnInit() {

  }

  ngAfterViewInit(){
    if(window.screen.width < 900){
      this.isDesktop = false;
    }
    this.cdr.detectChanges();
  }
  onLogout(){
    this.authService.logoutUser();
  }
  onSearch(form: any){
    this.router.navigate(["/f", this.searchTerm]);
  }

  sidenavClick(){
    this.navService.clickedButton();
  }
  clickSuggestion(film: any){
    this.searchTerm.next("");
    this.router.navigate(['/f', film.id]);
  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 900) {
            this.isDesktop = false;
        }
        if (event.target.innerWidth > 900) {
           this.isDesktop = true;
        }
    }
    getBackdrop(str: String){
      return "http://image.tmdb.org/t/p/original/" + str;
    }
    checkMobile(){
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){
         return true;
       }
      else {
         return false;
       }
    }
}
