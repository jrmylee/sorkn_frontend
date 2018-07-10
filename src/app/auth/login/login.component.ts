import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm } from '@angular/forms';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {User} from '../../models/user.model';

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.authService.isLoggedin.subscribe((obj)=>{
      this.loggedIn = obj;
    });
  }

  ngOnInit() {}

  onSubmit(form: NgForm){
    var value = form.value;

    this.authService.loginUser(value.username, value.password).subscribe(
          (res) => {
            console.log(res.headers.get('X-Auth'));
            console.log(res.headers);

            this.authService.storeToken(res.headers.get('x-auth'));
            this.authService.isLoggedin.next(true);
            this.snackBar.open("Logged in!", "Dismiss", {
              duration: 2000
            });
            this.router.navigate(['/explore']);
          },
          (err) => {
            this.snackBar.open(JSON.parse(err.error).msg, "Dismiss", {
              duration: 2000
            });
          }
        );
  }

}
