import {Subject} from 'rxjs/Subject';
import {Film} from '../../shared/film.model';
export class GreatsListService{
  greatsChanged = new Subject<Film[]>();
  startedEditing = new Subject<number>();
  private greats: Film[]=[
    {title: "Blade Runner", year: 1982},
    {title: "Blade Runner 2049", year: 2017}
  ];

  getGreats(){
    return this.greats.slice();
  }

  getGreat(index: number){
    return this.greats[index];
  }
  addGreat(great: Film){
    this.greats.push(great);
    this.greatsChanged.next(this.greats.slice());
  }
  removeGreat(index: number){
    this.greats.splice(index,1);
    this.greatsChanged.next(this.greats.slice());
  }
  updateGreat(index: number, great: Film){
    this.greats[index] = great;
    this.greatsChanged.next(this.greats.slice());
  }
}
