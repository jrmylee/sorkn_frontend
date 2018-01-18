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
  ngOnInit() {
    this.scriptService.getScripts().subscribe(
      (arr)=>{
        this.scripts = arr;
        this.loaded = true;
        console.log("Got!");
        this.dataSource = new MatTableDataSource<Script>(this.scripts);
      }
    , (err)=>{console.log(err)});
  }
  displayedColumns = ['name', 'description'];



  onNewScript(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
