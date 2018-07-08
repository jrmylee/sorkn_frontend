import { Component, OnInit} from '@angular/core';
import {Script} from '../script_model';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {ScriptService} from '../script.service';
import { ExternalNavService } from '../../../nav/nav.external.service';

import { NavService } from '../../../nav/nav.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-scripts-detail',
  templateUrl: './scripts-detail.component.html',
  styleUrls: ['./scripts-detail.component.scss']
})
export class ScriptsDetailComponent implements OnInit {
  script: Script;
  state: string = 'small';
  loggedIn: Boolean;
  myTemplate: any;
  constructor(private scriptService: ScriptService, private route: ActivatedRoute,
  private router: Router,private navService: ExternalNavService, private nav: NavService,
  private authService: AuthService) {
    this.nav.load();
    route.params.subscribe( (params:Params)=>{
      let id = params['id'];
      let self = this.route.snapshot.queryParams["self"];
      // if(self == 'false'){
      //   this.scriptService.getPublicScript(id).subscribe(obj=>{
      //     this.setScript(obj);
      //   });
      // }else if(self=='true'){
      //   this.scriptService.getPublicScript(id).subscribe(obj=>{
      //     this.setScript(obj);
      //   });
      // }else{
        
      // }
      this.scriptService.getPublicScript(id).subscribe(obj=>{
        this.setScript(obj);
      });
    }, (err)=>{console.log(err)});
  }

  setScript(obj){
    this.script = obj;
    this.nav.noload();
    this.myTemplate = this.script.script;
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.navService.toggleSidenav();
  }
  onEditScript(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  animateMe(){
    this.state = (this.state==='small'?'large':'small');
  }
  
}
