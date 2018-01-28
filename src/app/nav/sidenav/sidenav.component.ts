import { Component, ViewChild, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDrawer} from '@angular/material';
import {ChangeDetectorRef} from '@angular/core';
import * as Rx from "rxjs";

import {AuthService} from '../.././auth/auth.service';
import {NavService} from '../nav.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn: boolean;
  @ViewChild('sidenav') sidenav: MatDrawer;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private navService: NavService){

    this.authService.isLoggedin.subscribe(
        (val)=>{
          this.isLoggedIn = val;
        }
      );
    }
  ngOnInit(){
  }
  ngAfterViewInit(){
    if(window.screen.width < 500){
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
    this.cdr.detectChanges();

  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 500) {
          this.sidenav.mode="over";
          this.sidenav.close();
        }else{
          this.sidenav.mode="side";
          this.sidenav.toggle();
        }

    }

}
