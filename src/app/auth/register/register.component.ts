import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ActivatedRoute, Params,Router} from '@angular/router';

import {User} from '../../models/user.model';

import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  email: AbstractControl;
  user: AbstractControl;
  name: AbstractControl;
  password: AbstractControl;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
    private router: Router, fb:FormBuilder) {
    this.regForm = fb.group({
      'email': ['',
[        Validators.required,
        Validators.email,]
      ],
      'user': ['',
        Validators.required,
      ],'name': ['',
        Validators.required,
      ],
      'password': ['',
[        Validators.required,
        Validators.minLength(6),]
      ]
    });
    this.email = this.regForm.controls['email'];
    this.user = this.regForm.controls['user'];
    this.name = this.regForm.controls['name'];
    this.password = this.regForm.controls['password'];

  }

  ngOnInit() {
  }

  onSubmit(){
    var value = this.regForm.value;
    var user :User = {
      name: value.name,
      username: value.user,
      password: value.password,
      email: value.email,
      age: 18,
      imagePath: ""
    };

    this.authService.registerUser(user).subscribe((res)=>{
      this.snackBar.open(res.body,"Dismiss", {
        duration: 50000
      });
      this.router.navigate(["/explore"]);
      },(err)=>{
        this.snackBar.open("Username or Email already exists","Dismiss", {
          duration: 50000
        });
      }
    );
  }
}
