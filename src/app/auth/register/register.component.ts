import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm } from '@angular/forms';

import {User} from '../../shared/user.model';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const value = form.value;
    var user :User = {
      name: "John Doe",
      username: value.username,
      password: value.password,
      email: value.email,
      age: 18,
      imagePath: ""
    };
    this.authService.registerUser(user)
  }
}
