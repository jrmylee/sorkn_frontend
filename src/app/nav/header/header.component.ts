import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef, HostListener} from '@angular/core';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import * as Rx from "rxjs";
import {ChangeDetectorRef} from '@angular/core';

import {UserService} from '../../user/user.service';
import {AuthService} from '../.././auth/auth.service';
import {ServerService} from '../.././auth/server.service';
import {NavService} from '.././nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isDesktop: boolean = true;

  constructor(private authService: AuthService, private userService: UserService,
     private serverService: ServerService, private navService: NavService, private router: Router,
   private cdr: ChangeDetectorRef) {
    authService.isLoggedIn().subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    );
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    if(window.screen.width < 500){
      this.isDesktop = false;
    }
    this.cdr.detectChanges();
  }
  onLogout(){
    this.authService.logoutUser();
  }
  onSearch(form: any){
    this.router.navigate(["/f", form.search_value]);
  }

  sidenavClick(){
    this.navService.clickedButton();
  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 500) {
            this.isDesktop = false;
        }
        if (event.target.innerWidth > 500) {
           this.isDesktop = true;
        }
    }
}
