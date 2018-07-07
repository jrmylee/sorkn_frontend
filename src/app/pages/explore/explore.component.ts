import { Component, OnInit } from '@angular/core';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.load();
  }

}
