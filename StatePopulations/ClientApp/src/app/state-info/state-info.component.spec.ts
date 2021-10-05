import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StateInfo } from '../services/map.service';

import { StateInfoComponent } from './state-info.component';

describe('StateInfoComponent', () => {
    let component: StateInfoComponent;
    let fixture: ComponentFixture<StateInfoComponent>;
    const states: StateInfo[] = [
        { name: 'State1', gdp: 5849.10, population: 875841 },
        { name: 'State2', gdp: 98768.10, population: 2254123 },
    ]

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StateInfoComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StateInfoComponent);
        component = fixture.componentInstance;
        component.states = states;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('getTotalGdp', () => {
        it('should return the sum of GDP', () => { 
            expect(component.getTotalGdp()).toBeCloseTo(104617.2);
        });
    });

    describe('getTotalPoplation', () => {
        it('should return the sum of populations', () => {
            expect(component.getTotalPopulation()).toBe(3129964);
        });
    });
});
