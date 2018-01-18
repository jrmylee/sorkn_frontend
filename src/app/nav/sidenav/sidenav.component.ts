import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {AuthService} from '../.././auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private authService: AuthService){
    this.authService.isLoggedin.subscribe(
        (val)=>{
          this.isLoggedIn = val;
        }
      );
    }
  ngOnInit(){

  }
}
