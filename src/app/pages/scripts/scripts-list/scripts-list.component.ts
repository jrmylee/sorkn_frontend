import { Component, OnInit, Input} from '@angular/core';
import { Location } from '@angular/common';
import{Script} from '../script_model';
import{ScriptService, ClassicFilm} from '../script.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {HighlightDirective} from '../../../models/highlight.directive';

import {AuthService} from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { NavService } from '../../../nav/nav.service';
import { DeleteDialog } from '../../greats-list/listdetail/listdetail.component';
import { tap } from '../../../../../node_modules/rxjs/operators';
@Component({
  selector: 'app-scripts-list',
  templateUrl: './scripts-list.component.html',
  styleUrls: ['./scripts-list.component.scss'],

})
export class ScriptsListComponent implements OnInit {
  constructor(private scriptService: ScriptService, private router:Router,
              private route: ActivatedRoute, private authService: AuthService,
              private navService: NavService, public dialog: MatDialog,
              private location: Location) { }

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
    this.publicScripts$ = this.scriptService.getPublicScripts().pipe(tap(scripts=>{
      this.navService.noload();
    }));
    this.classicsList = this.scriptService.getClassics();
  }
  deleteScript(id: string){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.scriptService.deleteScript(id).subscribe(
          (res)=>{   location.reload();
          },
          (err)=>{console.log(err)});;
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
