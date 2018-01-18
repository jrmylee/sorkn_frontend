import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm } from '@angular/forms';

import {User} from '../../shared/user.model';

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  constructor(private authService: AuthService) {
    this.authService.isLoggedin.subscribe((obj)=>{
      this.loggedIn = obj;
    });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    var value = form.value;

    this.authService.loginUser(value.username, value.password);
  }
}
