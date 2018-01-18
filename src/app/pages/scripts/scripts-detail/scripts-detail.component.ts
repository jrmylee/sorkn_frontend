import { Component, OnInit} from '@angular/core';
import {Script} from '../script_model';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {ScriptService} from '../script.service';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
@Component({
  selector: 'app-scripts-detail',
  templateUrl: './scripts-detail.component.html',
  styleUrls: ['./scripts-detail.component.scss'],
  animations: [
    trigger('myAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)'
      })),
      transition('small => large', animate('150ms ease-in')),
      transition('large => small', animate('150ms ease-in')),

    ])
  ]
})
export class ScriptsDetailComponent implements OnInit {
  id: number;
  script: Script;
  state: string = 'small';
  loaded: boolean = false;

  constructor(private scriptService: ScriptService, private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.id = +params['id'];
      this.scriptService.getScripts().subscribe((arr)=>{
        this.script = arr[this.id];
        this.loaded = true;
      }, (err)=>{console.log(err)});
    });
  }
  onEditScript(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  animateMe(){
    this.state = (this.state==='small'?'large':'small');
  }
  delete(){
    this.scriptService.deleteScript(this.script);
    this.router.navigate(["/scripts"]);
  }
}
