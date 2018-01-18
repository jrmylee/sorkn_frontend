import {Subject} from 'rxjs/Subject';
import {GreatFilm} from '../../shared/greatfilm.model';
export class GreatsListService{
  greatsChanged = new Subject<GreatFilm[]>();
  startedEditing = new Subject<number>();
  private greats: GreatFilm[]=[
    new GreatFilm("Blade Runner", 1982),
    new GreatFilm("Blade Runner 2049", 2017)
  ];

  getGreats(){
    return this.greats.slice();
  }

  getGreat(index: number){
    return this.greats[index];
  }
  addGreat(great: GreatFilm){
    this.greats.push(great);
    this.greatsChanged.next(this.greats.slice());
  }
  removeGreat(index: number){
    this.greats.splice(index,1);
    this.greatsChanged.next(this.greats.slice());
  }
  updateGreat(index: number, great: GreatFilm){
    this.greats[index] = great;
    this.greatsChanged.next(this.greats.slice());
  }
}
