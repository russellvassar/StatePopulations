import { AfterViewInit, Component } from '@angular/core';
import { state, StateService } from '../state.service';
import { MapService } from '../map.service';

@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {

  constructor(private stateService: StateService, private mapService: MapService) { }
  
  ngAfterViewInit() {
    this.mapService.initializeMap("map");
    this.stateService.getStates(2019).subscribe(stateList => {
      this.mapService.loadStatesOnMap(stateList);
    });
  }

  
}
