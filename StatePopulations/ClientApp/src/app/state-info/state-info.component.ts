import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'state-info',
  templateUrl: './state-info.component.html',
  styleUrls: ['./state-info.component.css']
})
export class StateInfoComponent implements OnInit {
  constructor(public mapService: MapService) { }

  ngOnInit(): void {

  }
}
