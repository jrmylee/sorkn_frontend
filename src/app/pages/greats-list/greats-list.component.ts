import { Component, OnInit, Input } from '@angular/core';
import {GreatFilm} from '../../shared/greatfilm.model';
import {GreatsListService} from './greats-list.service';
import {Subscription} from 'rxjs/Subscription';
import {MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-greats-list',
  templateUrl: './greats-list.component.html',
  styleUrls: ['./greats-list.component.scss'],
  providers: [GreatsListService]
})
export class GreatsListComponent implements OnInit {
  private subscription: Subscription;
  constructor(private greatsListService: GreatsListService) { }
  greats : GreatFilm[] = this.greatsListService.getGreats();
  displayedColumns = ['name', 'description'];
  dataSource = new MatTableDataSource<GreatFilm>(this.greats);
  selectedRowIndex: number = -1;

  ngOnInit() {
    this.greats = this.greatsListService.getGreats();
    this.subscription = this.greatsListService.greatsChanged.subscribe((GreatFilms: GreatFilm[]) => {
      this.greats = GreatFilms;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditItem(index: number){
    this.greatsListService.startedEditing.next(index);
  }

  highlight(row){
    this.selectedRowIndex = row.id;
  }
}
