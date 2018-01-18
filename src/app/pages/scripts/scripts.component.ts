import { Component, OnInit } from '@angular/core';

import {Script} from './script_model';
import {ScriptService} from './script.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.scss'],
  providers: [ScriptService]
})
export class ScriptsComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

}
