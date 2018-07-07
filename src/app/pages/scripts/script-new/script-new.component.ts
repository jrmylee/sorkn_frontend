import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,NgForm } from '@angular/forms';
import {ScriptService} from '../script.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {Script} from '../script_model';
import {User} from '../../../models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-script-new',
  templateUrl: './script-new.component.html',
  styleUrls: ['./script-new.component.scss']
})
export class ScriptNewComponent implements OnInit {
  myForm: FormGroup;
  newScript: Script;
  privacy: String;
  constructor(private ScriptService: ScriptService,
  private router:Router, public dialog: MatDialog) {
    this.myForm= new FormGroup({

    });

  }

  ngOnInit() {
  }
  scriptEditor(){
    let dialogRef = this.dialog.open(ScriptComponent, {
      width: '500px',
      height:'90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onSubmit(form: NgForm){
    const value = form.value;
    var boo = false;
    if(this.privacy){
      if(this.privacy === "Public"){
        boo = true;
      }
    }
    this.newScript =  {
      _id: "",
      name: value.title,
      script: value.script,
      _creator: "5a5b0fc49d54eb00146229ff",
      __v: "",
      username: "",
      privacy: true
    };
    this.ScriptService.addScript(this.newScript).subscribe(obj=>{
      this.router.navigate(["/scripts"]);
    });
  }
}
@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
})
export class ScriptComponent {

  constructor(
    public dialogRef: MatDialogRef<ScriptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

