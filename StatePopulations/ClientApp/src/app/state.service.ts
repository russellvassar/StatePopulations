import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private yearUpdatedSource = new Subject<number>();

    public yearUpdated = this.yearUpdatedSource.asObservable();
    public selectedYear?: number;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public getStates(year: number) {
        return this.http.get<State[]>(this.baseUrl + "api/state", { params: { year: year } });
    }

    public getYears() {
        return this.http.get<number[]>(this.baseUrl + "api/years");
    }

    public updateSelectedYear(year: number) {
        this.selectedYear = year;
        this.yearUpdatedSource.next(year);
    }
}

export interface State {
    name: string;
    wkt: string;
    year: number;
    gdpBillionsChained2012: number;
    population: number;
}
