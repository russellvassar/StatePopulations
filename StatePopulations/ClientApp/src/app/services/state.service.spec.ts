import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
    let service: StateService;
    let mockHttpClient: jasmine.SpyObj<HttpClient>;
    

    beforeEach(() => {
        mockHttpClient = jasmine.createSpyObj(['http']);
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: mockHttpClient }, { provide: 'BASE_URL', useValue: ''}]
        });
        service = TestBed.inject(StateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('updateSelectedYear', () => {
        it('should update the selectedYear', () => {
            service.updateSelectedYear(2019);

            expect(service.selectedYear).toBe(2019);
        });
    });
});
