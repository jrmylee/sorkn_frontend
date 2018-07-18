import { Component, OnInit } from '@angular/core';
import { GreatsListService } from '../../greats-list/greats-list.service';
import { GreatsList } from '../../../models/list.model';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Film } from '../../../models/film.model';
import { NavService } from '../../../nav/nav.service';
import { ScriptService, ClassicFilm } from '../../scripts/script.service';
import { ServerService } from '../../../auth/server.service';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  lists: Observable<GreatsList[]>;

  // Going to change this to recently starred films, for now just classics
  screenplays: Observable<ClassicFilm[]> = of(this.scriptService.getClassics()); 

  constructor(private greatsListService: GreatsListService,private navService: NavService,
              private scriptService: ScriptService, private serverService: ServerService) {
    this.lists = greatsListService.getLists().pipe(
      map((obj:GreatsList[])=>{
      this.navService.noload();
      return obj.slice(0,4);
    }),catchError(err=>{
      return throwError(err)
    }));

    this.screenplays = this.screenplays.pipe(
      map((obj:GreatsList[])=>{
        return obj.slice(0,4);
    }),catchError(err=>{
      return throwError(err)
    }));
  }

  ngOnInit() {
  }
  getBackdrop(film: Film){
    return this.greatsListService.getBackground(film);
  }
}
