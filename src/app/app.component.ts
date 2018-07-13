import { Component } from '@angular/core';
import { NavService } from './nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerOpen : boolean = true;
  constructor(private navService: NavService){
    this.navService.headerStatus.subscribe(status=>{
      if(status=="opened"){
        this.headerOpen = true;
      }else{
        this.headerOpen = false;
      }
    });
  }
}
