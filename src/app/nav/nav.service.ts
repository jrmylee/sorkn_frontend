import {Injectable, HostListener} from '@angular/core'
import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef} from '@angular/core';
import {MatButton} from '@angular/material';

import * as Rx from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
@Injectable()
export class NavService implements OnInit{
  private openedSidenav = new BehaviorSubject<string>("closed");
  currentMessage = this.openedSidenav.asObservable();

  private loading = new BehaviorSubject<string>("negative");
  loadingStatus = this.loading.asObservable();

  constructor(){

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
