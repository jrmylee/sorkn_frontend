import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef, HostListener} from '@angular/core';
import {Form, NgForm} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import * as Rx from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';

import {UserService} from '../../user/user.service';
import {AuthService} from '../.././auth/auth.service';
import {ServerService} from '../.././auth/server.service';
import {NavService} from '.././nav.service';
import {SearchService} from './search.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isDesktop: boolean = true;
  searchTerm = new Subject<string>();
  results: any[] = [];
  constructor(private authService: AuthService, private userService: UserService,
              private serverService: ServerService, private navService: NavService,
              private router: Router, private cdr: ChangeDetectorRef,
              private searchService: SearchService, public dialog: MatDialog) {
               
    authService.isLoggedIn().subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    );

    this.searchService.search(this.searchTerm).subscribe(results => {
      console.log(results);
      if(results.results != null){
        this.results = results.results;
      }else{
        this.results = [];
      }
    });
  }
  ngOnInit() {

  }

  ngAfterViewInit(){
    if(window.screen.width < 900){
      this.isDesktop = false;
    }
    this.cdr.detectChanges();
  }

  onClickLogin(){
    const dialogRef = this.dialog.open(LoginDialog, {
      height: '60%',
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onLogout(){
    this.authService.logoutUser();
  }

  onSearch(form: any){
    this.router.navigate(["/f", this.searchTerm]);
  }

  sidenavClick(){
    this.navService.clickedButton();
  }
  clickSuggestion(film: any){
    this.searchTerm.next("");
    this.router.navigate(['/f', film.id]);
  }
  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 900) {
            this.isDesktop = false;
        }
        if (event.target.innerWidth > 900) {
           this.isDesktop = true;
        }
    }
    getBackdrop(str: String){
      return "https://image.tmdb.org/t/p/original/" + str;
    }
    checkMobile(){
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){
         return true;
       }
      else {
         return false;
       }
    }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login-dialog.scss']
})
export class LoginDialog {
  state: string = "none";
  loggedIn: boolean = false;
  email: string;
  constructor(public dialogRef: MatDialogRef<LoginDialog>, private authService: AuthService,
              private router: Router, private snackBar: MatSnackBar){
    this.authService.isLoggedin.subscribe((obj)=>{
      this.loggedIn = obj;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(str: string){
    this.state = str;
  }

  onResend(){
    this.authService.resendEmail(this.email).subscribe(res=>{
      this.snackBar.open(res.body, "Dismiss", {
        duration: 2000
      })
    }, err=>{
      console.log(err);
    });
  }

  onSubmit(form: NgForm){
    var value = form.value;
    console.log(value);
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
        console.log(err.error);
        this.snackBar.open(JSON.parse(err.error).msg, "Dismiss", {
          duration: 2000
        });
      }
    );
  }


}