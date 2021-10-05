import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { SnackBarService } from '../services/snackbar.service';
import { StateService } from '../services/state.service';
import { YearsComponent } from './years.component';

describe('YearsComponent', () => {
    let component: YearsComponent;
    let fixture: ComponentFixture<YearsComponent>;
    let mockStateService: jasmine.SpyObj<StateService>;
    let mockSnackbarService;
    let years: number[] = [];

    beforeEach(async () => {
        mockStateService = jasmine.createSpyObj(['getStates', 'getYears', 'updateSelectedYear']);
        mockSnackbarService = jasmine.createSpyObj(['showLoadingSnackbar', 'hideLoadingSnackbar']);
        years = [2019, 2018];
        await TestBed.configureTestingModule({
            imports: [MatMenuModule],
            declarations: [YearsComponent],
            providers: [
                { provide: StateService, useValue: mockStateService },
                { provide: SnackBarService, useValue: mockSnackbarService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(YearsComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        mockStateService.getYears.and.returnValue(of(years));
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should set the years variable from stateService', () => {
        mockStateService.getYears.and.returnValue(of(years));
        fixture.detectChanges();

        expect(component.years[0]).toBe(2019);
        expect(component.years[1]).toBe(2018);
    });

    it('should call stateService.updateYear with first year in list', () => {
        mockStateService.getYears.and.returnValue(of(years));
        fixture.detectChanges();

        expect(mockStateService.updateSelectedYear).toHaveBeenCalledWith(2019);
    });

    describe('setYear', () => {
        it('should call updateSelectedYear with the given year', () => {
            component.setYear(2019);

            expect(mockStateService.updateSelectedYear).toHaveBeenCalledWith(2019);
        });
    });
});
