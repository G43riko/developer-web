import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface DataType {
    airports: string[]
    countries: string[]
}

@Injectable({
    providedIn: "root",
})
export class DataService {
    public constructor(private readonly httpClient: HttpClient) {

    }

    public getAllAirports(): Observable<DataType["airports"]> {
        return this.httpClient.get<DataType>("./assets/data.json").pipe(map((data) => data.airports));
    }

    public getAllCountries(): Observable<DataType["countries"]> {
        return this.httpClient.get<DataType>("./assets/data.json").pipe(map((data) => data.countries));
    }

}
