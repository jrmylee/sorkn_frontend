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
  headerOpen: boolean = true;
  @ViewChild('sidenav') sidenav: MatDrawer;


  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private navService: NavService,
    private router: Router, private activeRoute: ActivatedRoute){

      authService.isLoggedin.subscribe((val)=>{
          this.isLoggedIn = val;
        }
      );

      navService.headerStatus.subscribe(status=>{
        if(status=="opened"){
          this.headerOpen = true;
        }else{
          this.headerOpen = false;
        }
      });
    }
  ngOnInit(){
    this.navService.loadingStatus.subscribe(message=>{
      if(message === "positive"){
        this.loading = true;
      }else{
        this.loading = false;
      }
    });
    this.navService.currentMessage.subscribe(msg=>{
      if(msg == "toggled"){
        this.sidenav.toggle();
      }
    })
  }
  ngAfterViewInit(){
    this.width = window.screen.width;
    this.cdr.detectChanges();
  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if(window.screen.width<900){
        this.sidenav.close();
      }
    }
    onClick(){
      if(this.width<900){
        this.sidenav.toggle();
      }
    }
}
