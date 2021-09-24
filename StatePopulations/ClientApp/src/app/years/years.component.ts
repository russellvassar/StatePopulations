import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../services/snackbar.service';
import { StateService } from '../services/state.service';

@Component({
    selector: 'years',
    templateUrl: './years.component.html',
    styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {
    public years: number[] = [];

    constructor(public stateService: StateService, private snackBarService: SnackBarService) { }

    ngOnInit(): void {
        this.snackBarService.showLoadingSnackbar();
        this.stateService.getYears().subscribe(years => {
            this.years = years;
            this.stateService.updateSelectedYear(years[0]);
        });
    }

    public setYear(year: number) {
        this.stateService.updateSelectedYear(year);
    }
}
