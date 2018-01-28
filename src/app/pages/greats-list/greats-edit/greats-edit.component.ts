import { Component, OnInit, ElementRef, EventEmitter, Output,ViewChild } from '@angular/core';
 import {Film} from '../../../shared/film.model';
 import {GreatsListService} from '../greats-list.service';
 import {NgForm} from '@angular/forms';
 import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-greats-edit',
  templateUrl: './greats-edit.component.html',
  styleUrls: ['./greats-edit.component.scss']
})
export class GreatsEditComponent implements OnInit {
  @ViewChild('f') glForm: NgForm;
  subscription : Subscription;
  editMode = false;
  edittedItemIndex: number;
  editedItem: Film;
  constructor(private greatsListService: GreatsListService) { }

  ngOnInit() {
    this.greatsListService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.edittedItemIndex = index;
        this.editedItem = this.greatsListService.getGreat(index);
        this.glForm.setValue({
          name: this.editedItem.title,
          year: this.editedItem.year
        }
        );
      }
    );
  }
  onAddItem(form: NgForm){

  }

  onClear(){
    this.glForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.greatsListService.removeGreat(this.edittedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
  }
}
