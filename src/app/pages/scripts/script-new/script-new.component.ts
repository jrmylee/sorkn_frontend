import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm } from '@angular/forms';
import {ScriptService} from '../script.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {Script} from '../script_model';
import {User} from '../../../shared/user.model';
@Component({
  selector: 'app-script-new',
  templateUrl: './script-new.component.html',
  styleUrls: ['./script-new.component.scss']
})
export class ScriptNewComponent implements OnInit {
  myForm: FormGroup;
  newScript: Script;
  constructor(private ScriptService: ScriptService,
  private router:Router) {
    this.myForm= new FormGroup({

    });

  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const value = form.value;
    this.newScript =  {
      _id: "5a5b169d9d54eb0014622a04",
      name: value.title,
      script: value.script,
      _creator: "5a5b0fc49d54eb00146229ff",
      __v: ""
    };
    this.ScriptService.addScript(this.newScript);
    this.router.navigate(["/scripts"]);
  }
}
