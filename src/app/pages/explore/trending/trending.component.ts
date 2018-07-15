import { Component, OnInit } from '@angular/core';
import { GreatsListService } from '../../greats-list/greats-list.service';
import { GreatsList } from '../../../models/list.model';
import { Observable } from 'rxjs/Observable';
import { Film } from '../../../models/film.model';
import { NavService } from '../../../nav/nav.service';
import { ScriptService, ClassicFilm } from '../../scripts/script.service';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  lists: Observable<GreatsList[]>;

  // Going to change this to recently starred films, for now just classics
  screenplays: Observable<ClassicFilm[]> = Observable.of(this.scriptService.getClassics()); 

  constructor(private greatsListService: GreatsListService,private navService: NavService,
              private scriptService: ScriptService) {
    this.lists = greatsListService.getLists().map(obj=>{
      this.navService.noload();
      return obj.slice(0,4);
    }).catch(err=>{
      return Observable.throw(err)
    });

    this.screenplays = this.screenplays.map(obj=>{
      return obj.slice(0,4);
    }).catch(err=>{
      return Observable.throw(err)
    });
  }

  ngOnInit() {
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackground(film);
  }
}
