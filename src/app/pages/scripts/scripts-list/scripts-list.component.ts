import { Component, OnInit, Input} from '@angular/core';
import{Script} from '../script_model';
import{ScriptService} from '../script.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {MatTableDataSource, MatSort} from '@angular/material';
import {HighlightDirective} from '../../../shared/highlight.directive';

import {AuthService} from '../../../auth/auth.service';
@Component({
  selector: 'app-scripts-list',
  templateUrl: './scripts-list.component.html',
  styleUrls: ['./scripts-list.component.scss'],

})
export class ScriptsListComponent implements OnInit {
  constructor(private scriptService: ScriptService, private router:Router
  ,private route: ActivatedRoute, private authService: AuthService) { }

  scripts : Script[];
  loaded: boolean = false;
  dataSource: MatTableDataSource<Script>;
  isLoggedIn : boolean;
  ngOnInit() {
    this.authService.isLoggedin.subscribe(
      (val)=>{
        this.isLoggedIn = val;
      }
    );
    if(this.isLoggedIn){
      this.scriptService.getScripts().subscribe(
        (arr)=>{
          this.scripts = arr;
          this.loaded = true;
        }
      , (err)=>{console.log(err)});
    }

  }


  onNewScript(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
