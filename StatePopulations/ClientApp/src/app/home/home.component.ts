import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { state, StateService } from '../state.service';
import { Feature, Map, View } from 'ol';
import { WKT } from 'ol/format';
import { Vector } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { fromLonLat, transformExtent } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Projection from 'ol/proj/Projection';
import Geometry from 'ol/geom/Geometry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  

  
}
