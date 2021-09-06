import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getStates(year: number) {
    return this.http.get<state[]>(this.baseUrl + "api/state", { params: { year: year } });
  }
}

export interface state {
  name: string;
  wkt: string;
  year: number;
  gdpBillionsChained2012: number;
  population: number;
}
