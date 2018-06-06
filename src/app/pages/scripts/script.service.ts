import {Script} from './script_model';
import {User} from '../../shared/user.model';
import {Injectable, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {ServerService} from '../../auth/server.service';

@Injectable()
export class ScriptService{
  constructor(private authService: AuthService, private serverService: ServerService){

  }
  private scripts: Script[];

  ngOnInit(){

  }
  getScripts(){
    return this.serverService.getScripts();
  }

  getScript(id: string){
    this.serverService.getScripts().subscribe((arr)=>{
      return arr.find(i => i._id == id)
    },(err)=>{console.log(err)});
  }

  addScript(script: Script){
    this.serverService.addScript(script);
  }

  deleteScript(script: Script){
    this.serverService.deleteScript(script);
  }
}
