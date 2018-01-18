import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params,Router} from '@angular/router';

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      console.log(params['URL']);
      this.authService.verifyUser(params['URL']);
    });
  }

}
