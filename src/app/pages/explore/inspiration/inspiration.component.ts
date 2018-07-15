import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.scss']
})
export class InspirationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  openGetStarted(): void {
    const dialogRef = this.dialog.open(GetStartedDialog, {
      height: '50%',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLearnMore(): void {

  }
  ngOnInit(){

  }
}

@Component({
  selector: 'get-started-dialog',
  templateUrl: 'get-started-dialog.html',
})
export class GetStartedDialog {

  constructor(
    public dialogRef: MatDialogRef<GetStartedDialog>){

    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}