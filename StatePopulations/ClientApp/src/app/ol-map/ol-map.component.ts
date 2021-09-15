import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { StateService } from '../state.service';
import { MapService } from '../map.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {
  @ViewChild('loadingTemplate') loadingTemplate!: TemplateRef<any>;

  constructor(private stateService: StateService, private mapService: MapService, private _snackBar: MatSnackBar) { }
  
  ngAfterViewInit() {
    this.mapService.initializeMap("map");
    this.showLoadingMessage();
    this.stateService.getStates(2019).subscribe(stateList => {
      this.mapService.loadStatesOnMap(stateList);
    }).add(() => this.hideLoadingMessage());
  }

  private showLoadingMessage() {
    this._snackBar.openFromTemplate(this.loadingTemplate);
  }

  private hideLoadingMessage() {
    this._snackBar.dismiss();
  }
}
