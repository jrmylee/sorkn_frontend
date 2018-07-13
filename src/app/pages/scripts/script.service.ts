import {Script} from './script_model';
import {User} from '../../models/user.model';
import {Injectable, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {ServerService} from '../../auth/server.service';

@Injectable()
export class ScriptService{
  classicFilmsList: ClassicFilm[] = [
    {
      title:"Her",
      image:"https://image.tmdb.org/t/p/original//4f4tWe6uhwtuKMygfIAytR2W0pj.jpg",
      id:"152601"
    },
    {
      title:"Being John Malkovich",
      image:"https://filmgrab.files.wordpress.com/2011/02/238.png",
      id:"492"
    },
    {
      title:"Being There",
      image:"https://static.rogerebert.com/uploads/review/primary_image/reviews/great-movie-being-there-1979/hero_EB19970525REVIEWS08401010303AR.jpg",
      id:"10322"
    }
    ,{
      title:"Birdman",
      image:"https://78.media.tumblr.com/169f7c5155dfe5253cfa88caab4c4859/tumblr_njt4smfPNM1st09ivo8_1280.png",
      id:"194662"
    },
    {
      title:"2001: A Space Odyssey",
      image:"https://consequenceofsound.files.wordpress.com/2018/04/2001-a-space-odessy.png",
      id:"62"
    },
    {
      title:"A Serious Man",
      image:"https://static1.squarespace.com/static/58fbd8bd59cc68d776f7ea01/58fd27e279a5a28f4265986a/58fd2b9b79a5a28f426607e8/1502137801707/serious+man.jpg?format=2500w",
      id:"12573"
    }
  ];
  constructor(private authService: AuthService, private serverService: ServerService){

  }
  private scripts: Script[];

  ngOnInit(){

  }
  getScripts(){
    return this.serverService.getScripts();
  }

  getScript(id: string){
    return this.serverService.getPublicScript(id);
  }

  getPublicScript(id: string){
    return this.serverService.getPublicScript(id);
  }

  getPublicScripts(){
    return this.serverService.getPublicScripts();
  }

  addScript(script: Script){
    return this.serverService.addScript(script);
  }

  deleteScript(id: string){
    return this.serverService.deleteScript(id);
  }
  getClassics(){
    return this.classicFilmsList;
  }
  getUser(username: string){
    return this.serverService.getUser(username);
  }
}
export interface ClassicFilm{
  title:string;
  image: string;
  id: string;
}