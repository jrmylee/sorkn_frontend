import { Component, OnInit, Input} from '@angular/core';
import{Script} from '../script_model';
import{ScriptService, ClassicFilm} from '../script.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {HighlightDirective} from '../../../models/highlight.directive';

import {AuthService} from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { NavService } from '../../../nav/nav.service';
import { DeleteDialog } from '../../greats-list/listdetail/listdetail.component';
@Component({
  selector: 'app-scripts-list',
  templateUrl: './scripts-list.component.html',
  styleUrls: ['./scripts-list.component.scss'],

})
export class ScriptsListComponent implements OnInit {
  constructor(private scriptService: ScriptService, private router:Router
  ,private route: ActivatedRoute, private authService: AuthService, private navService: NavService, public dialog: MatDialog) { }

  scripts$ : Observable<Script[]>;
  publicScripts$: Observable<Script[]>;
  loaded: boolean = false;
  dataSource: MatTableDataSource<Script>;
  isLoggedIn : boolean;
  classicsList: ClassicFilm[];
  ngOnInit() {
    this.navService.load();

    this.authService.isLoggedin.subscribe(
      (val)=>{
        this.isLoggedIn = val;
      }
    );
    if(this.isLoggedIn){
      this.scripts$ = this.scriptService.getScripts()
    }
    this.publicScripts$ = this.scriptService.getPublicScripts().do(scripts=>{
      this.navService.noload();
    });
    this.classicsList = this.scriptService.getClassics();
  }
  deleteScript(id: string){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("deleting");        
        this.scriptService.deleteScript(id);
      }
    });
  }
  clickScript(classic: ClassicFilm){
    this.router.navigate(["/f/", classic.id]);
  }
  onNewScript(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
