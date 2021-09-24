import { AfterViewInit, Component } from '@angular/core';
import { StateService } from '../services/state.service';
import { MapService } from '../services/map.service';
import { SnackBarService } from '../services/snackbar.service';

@Component({
    selector: 'ol-map',
    templateUrl: './ol-map.component.html',
    styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {
    constructor(private stateService: StateService, private mapService: MapService, private snackBarService: SnackBarService) { }

    ngAfterViewInit() {
        this.mapService.initializeMap("map");

        this.stateService.yearUpdated.subscribe(year => {
            this.snackBarService.showLoadingSnackbar();
            this.mapService.clearStates();
            this.stateService.getStates(year).subscribe(stateList => {
                this.mapService.loadStatesOnMap(stateList);
            }).add(() => this.snackBarService.hideLoadingSnackbar());
        });
    }
}
