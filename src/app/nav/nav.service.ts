import {Injectable, OnInit} from '@angular/core'
import { BehaviorSubject, from } from 'rxjs';
import { Router } from '@angular/router'

@Injectable()
export class NavService implements OnInit{
  private openedSidenav = new BehaviorSubject<string>("closed");
  currentMessage = from(this.openedSidenav)

  private loading = new BehaviorSubject<string>("negative");
  loadingStatus = from(this.loading)

  private header= new BehaviorSubject<string>("open");
  headerStatus = from(this.header);

  private clickLoginDialog = new BehaviorSubject<string>("none");
  loginDialogMsg = from(this.clickLoginDialog);


  private pageOn = new BehaviorSubject<string>("home");
  pageState = from(this.pageOn);

  constructor(router: Router){
    router.events.subscribe((res) => { 
      if(router.url){
        if(router.url.lastIndexOf("/s/", 0) === 0){
          this.header.next("closed");
        }else{
          this.header.next("opened");
          if(router.url == "/explore"){
            this.pageOn.next("home");
          }else if(router.url == "/scripts"){
            this.pageOn.next("scripts");
          }else if(router.url == "/films"){
            this.pageOn.next("films");
          }else if(router.url == "/lists"){
            this.pageOn.next("lists");
          }
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
  loginDialogOpen(msg: string){
    this.clickLoginDialog.next(msg);
  }
  toggleSidenav(){
    
  }
}
