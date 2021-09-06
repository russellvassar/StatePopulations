import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { Feature, Map, View } from 'ol';
import { WKT } from 'ol/format';
import { state } from './state.service';
import Geometry from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { XYZ } from 'ol/source';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?: Map;
  private wktFormat = new WKT();
  private stateVector = new Vector({
    source: new VectorSource()
  });

  constructor() { }

  public loadStatesOnMap(states: state[]) {
    const stateFeatures: Feature<any>[] = [];
    let mainMaxX = 0;
    for (let state of states) {
      const feature = this.wktFormat.readFeature(state.wkt);
      feature.set("population", state.population);
      feature.set("gdp", state.gdpBillionsChained2012);
      feature.set("name", state.name);
      stateFeatures.push(feature);
      if (state.name.toLowerCase() === "maine") {
        mainMaxX = (<Geometry>feature.getGeometry()).getExtent()[2];
      }
    }
    this.stateVector.getSource().addFeatures(stateFeatures);
    const extent = this.stateVector.getSource().getExtent();
    extent[2] = mainMaxX; //Fix the map, so it doesn't wrap around the world.
    this.map?.getView().fit(extent);
  }

  public initializeMap(mapId: string) {
    this.map = new Map({
      target: mapId,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        this.stateVector
      ],
      view: new View({
        zoom: 2,
        center: [0, 0]
      })
    });
  }

}
