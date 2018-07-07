import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params,Router} from '@angular/router';

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  processed: boolean = false;
  verified: boolean = false;
  message: string;
  constructor(private route: ActivatedRoute,
  private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.authService.verifyUser(params['URL']).subscribe(
        (res)=>{
          this.processed = true;
          this.verified = true;
          this.message = res.body;
        },(err)=>{
          this.processed = true;
          this.message = JSON.parse(err.error).msg;
          console.log(err);
        }
      );
    });
  }

}
