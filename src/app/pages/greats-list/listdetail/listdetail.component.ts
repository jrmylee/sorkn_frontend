import { Component, OnInit, Input, Inject } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Film} from '../../../models/film.model';
import {GreatsList} from '../../../models/list.model';
import {GreatsListService} from '.././greats-list.service';

import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-listdetail',
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.scss']
})
export class ListdetailComponent implements OnInit {
  list$: Observable<GreatsList>;
  myList: boolean= false;
  constructor(private listService: GreatsListService, private activatedRoute: ActivatedRoute,
              public dialog: MatDialog, private router: Router) {
    this.activatedRoute.params.subscribe( (params:Params)=>{
      let id = params['id'];
      this.list$ = listService.getList(id);

    }, (err)=>{console.log(err)});
    this.isMyList();
  }

  ngOnInit() {
  }
  getBackdrop(film: Film){
    return this.listService.getBackdrop(film);
  }
  isMyList(){
    this.list$.subscribe((list: GreatsList)=>{
      this.listService.getCurrentUser().subscribe((user: User)=>{
        this.myList = user.username === list.username;
      },(err)=>{console.log(err)})
    });
   
  }
  deleteList(id: string){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.listService.deleteList(id).subscribe(res=>{
          this.router.navigate(["/lists"]);
        },(err)=>{
          console.log(err);
        });;
      }
    });
  }
  editList(list: GreatsList){
    console.log(list);
  }
}
@Component({
  selector: 'delete-dialog',
  template: `
  <h1 mat-dialog-title>Delete List!</h1>
  <div mat-dialog-content>
    <p>Are you sure?</p>
    
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()" cdkFocusInitial>No Thanks</button>
    <button mat-button [mat-dialog-close]="deleted" (click)="onDelete()">Ok</button>
  </div>`
  
})
export class DeleteDialog {
  deleted: string = "yes!";
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(){
  }
}
