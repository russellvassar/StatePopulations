import { TestBed } from '@angular/core/testing';
import { MapService, StateInfo } from './map.service';

describe('MapService', () => {
    let service: MapService;
    const states: StateInfo[] = [
        { name: 'State1', gdp: 5849.10, population: 875841 },
        { name: 'State2', gdp: 98768.10, population: 2254123 },
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MapService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('clear states', () => {
        it('should empty out the selectedStates variable', () => {
            service.selectedStates = states;

            service.clearStates();

            expect(service.selectedStates.length).toBe(0);
        });
    });
});
