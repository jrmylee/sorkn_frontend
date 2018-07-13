import {Injectable, HostListener} from '@angular/core'
import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef} from '@angular/core';
import {MatButton} from '@angular/material';

import * as Rx from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import { Router } from '../../../node_modules/@angular/router';
@Injectable()
export class NavService implements OnInit{
  private openedSidenav = new BehaviorSubject<string>("closed");
  currentMessage = this.openedSidenav.asObservable();

  private loading = new BehaviorSubject<string>("negative");
  loadingStatus = this.loading.asObservable();

  private header= new BehaviorSubject<string>("open");
  headerStatus = this.header.asObservable();
  constructor(router: Router){
    router.events.subscribe((res) => { 
      if(router.url){
        if(router.url.lastIndexOf("/s/", 0) === 0){
          this.header.next("closed");
        }else{
          this.header.next("opened");
        }
      }
    });

  }
  ngOnInit(){

  }
  ngAfterViewInit(){
  }
  clickedButton(){
    this.openedSidenav.next("toggled");
  }
  load(){
    this.loading.next("positive");
  }
  noload(){
    this.loading.next("negative");
  }
  toggleSidenav(){
    
  }
}
