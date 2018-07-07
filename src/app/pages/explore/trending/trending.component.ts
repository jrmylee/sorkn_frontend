import { Component, OnInit } from '@angular/core';
import { GreatsListService } from '../../greats-list/greats-list.service';
import { GreatsList } from '../../../models/list.model';
import { Observable } from 'rxjs/Observable';
import { Film } from '../../../models/film.model';
import { NavService } from '../../../nav/nav.service';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  lists: Observable<GreatsList[]>;
  constructor(private greatsListService: GreatsListService,private navService: NavService) {
    this.lists = greatsListService.getLists().do(obj=>{
      navService.noload();
    });
  }

  ngOnInit() {
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackground(film);
  }
}
