import { Component, ViewChild, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDrawer} from '@angular/material';
import {ChangeDetectorRef} from '@angular/core';
import * as Rx from "rxjs";

import {AuthService} from '../.././auth/auth.service';
import {NavService} from '../nav.service';
import { ActivatedRoute, Params, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn: boolean;
  width: number;
  loading: boolean = true;
  @ViewChild('sidenav') sidenav: MatDrawer;
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private navService: NavService,
    private router: Router, private activeRoute: ActivatedRoute){

    this.authService.isLoggedin.subscribe(
        (val)=>{
          this.isLoggedIn = val;
        }
      );
    }
  ngOnInit(){
    this.navService.loadingStatus.subscribe(message=>{
      if(message === "positive"){
        this.loading = true;
      }else{
        this.loading = false;
      }
    })
  }
  ngAfterViewInit(){
    if(window.screen.width < 900){
      this.sidenav.mode = "over";
      this.navService.currentMessage.subscribe(message => {
         if(this.sidenav.opened){
           this.sidenav.close();
         }else{
           this.sidenav.open();
         }
      });
    }else{
      this.sidenav.open();
    }
    this.width = window.screen.width;
    this.cdr.detectChanges();

    this.router.events.subscribe((val: RouterEvent)=>{
      if(val.url){
        if(window.screen.width>900){
          if(val.url.lastIndexOf('/s/',0)===0|| val.url.lastIndexOf('/new',0)===0 ){
            this.sidenav.close();
          }else{
            this.sidenav.open();
          }
        }
      }
    });
  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if(window.screen.width<900){
        this.sidenav.close();
      }else{
        this.sidenav.open();
      }
    }
    onClick(){
      if(this.width<900){
        this.sidenav.toggle();
      }
    }
}
