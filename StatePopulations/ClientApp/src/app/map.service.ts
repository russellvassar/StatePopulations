import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import { WKT } from 'ol/format';
import { State } from './state.service';
import Geometry from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { XYZ } from 'ol/source';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

@Injectable({
    providedIn: 'root'
})

export class MapService {
    private map?: Map;
    private wktFormat = new WKT();
    public hoverState?: StateInfo | null;

    //private hoverState: state = null;
    private stateVector = new Vector({
        source: new VectorSource()
    });

    constructor() { }

    public loadStatesOnMap(states: State[]) {
        const stateFeatures: Feature<any>[] = [];
        let mainMaxX = 0;
        for (let state of states) { //Loop through the states and add features to the map.
            const feature = this.wktFormat.readFeature(state.wkt);
            //Add population, gdp, and name to each state.
            feature.set('population', state.population);
            feature.set('gdp', state.gdpBillionsChained2012);
            feature.set('name', state.name);
            stateFeatures.push(feature);
            if (state.name.toLowerCase() === 'maine') {
                mainMaxX = (<Geometry>feature.getGeometry()).getExtent()[2]; //Save the maxx for Maine.
            }
        }
        this.stateVector.getSource().addFeatures(stateFeatures);
        const extent = this.stateVector.getSource().getExtent();
        //Fix the map, so it doesn't wrap around the world.
        //The edge of Alaska wraps from negative to positive longitude, so we'll basically get the whole world if we don't fix it.
        //Set the right edge the egde of Maine instead.
        extent[2] = mainMaxX;
        this.map?.getView().fit(extent);
    }

    public initializeMap(mapId: string) {
        //Set up the map.
        this.createMap(mapId);
        //Subscribe to pointermove event.
        this.map?.on('pointermove', (event: MapBrowserEvent<MouseEvent>) => {
            this.getHoverFeatures(event.coordinate); //Get the features
            const hoverFeatures = this.getHoverFeatures(event.coordinate); //Get the features that the mouse is over.
            this.clearFeatureStyles(); //Clear current styles.
            if (hoverFeatures && hoverFeatures.length) { //if there are any features under the mouse.
                this.hoverState = {
                    gdp: hoverFeatures[0].get("gdp"),
                    name: hoverFeatures[0].get("name"),
                    population: hoverFeatures[0].get("population")
                };
                this.setHoverStyle(hoverFeatures[0]); //Set the feature under the mouse to the hover style.
            } else { //The mouse isn't over any states.
                this.hoverState = null;
            }
        });
    }

    //Private methods.
    private createMap(mapId: string) {
        this.map = new Map({
            target: mapId,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' //This is the open street map base layer.
                    })
                }),
                this.stateVector //This is the layer that contains the states.
            ],
            view: new View({
                zoom: 2,
                center: [0, 0]
            })
        });
    }

    private getHoverFeatures(coordinate: number[]) {
        return this.stateVector.getSource().getFeaturesAtCoordinate(coordinate);
    }

    private clearFeatureStyles() {
        for (const f of this.stateVector.getSource().getFeatures()) {
            f.setStyle(undefined);
        }
    }

    private setHoverStyle(feature: Feature<Geometry>) {
        feature.setStyle(new Style({
            stroke: new Stroke({
                width: 5,
                color: 'red'
            })
        }));
    }
}

export interface StateInfo {
    name: string;
    gdp: number;
    population: number;
}
