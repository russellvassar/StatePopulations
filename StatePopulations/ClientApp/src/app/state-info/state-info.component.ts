import { Component, Input, OnInit } from '@angular/core';
import { StateInfo } from '../services/map.service';

@Component({
    selector: 'state-info',
    templateUrl: './state-info.component.html',
    styleUrls: ['./state-info.component.css']
})
export class StateInfoComponent implements OnInit {
    @Input() states: StateInfo[] = [];

    constructor() { }

    getTotalGdp(): number {
        let sum = 0;
        for (const s of this.states) {
            sum += s.gdp;
        }
        return sum;
    }

    getTotalPopulation(): number {
        let sum = 0;
        for (const s of this.states) {
            sum += s.population;
        }
        return sum;
    }

    ngOnInit(): void { }
}
