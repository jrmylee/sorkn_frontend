import { Component, OnInit,EventEmitter, Output} from '@angular/core';
import {AuthService} from '../.././auth/auth.service';
import {ServerService} from '../.././auth/server.service';

import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private userService: UserService,
     private serverService: ServerService) {
    authService.isLoggedin.subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    );
  }
  username: string = "?";
  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }
  ngOnInit() {

  }
  onRegister(){

  }
  onLogin(){

  }
  onLogout(){
    this.authService.logoutUser();
  }
}
