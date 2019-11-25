import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {ResultModel} from "../models/result.model";
import {switchMap} from "rxjs/operators";
import {RequestModel} from "../models/request.model";
import {MessageType} from "../types/message.type";


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public readonly data$ = new BehaviorSubject<(ResultModel | string)[]>([]);
    private queryCounter = 1;
    private briefingCounter = 1;

    public constructor(private readonly httpClient: HttpClient,
                       private readonly configService: ConfigService) {
    }

    public search(formRawValues: { types: any, countries: string[], airports: string[] }): Observable<boolean> {
        return this.httpClient.post(this.configService.apiLink, this.getBody(formRawValues)).pipe(
            switchMap((data: { id: string, error?: any, result: ResultModel[] }) => {
                if (data.error) {
                    this.data$.next([]);
                    return throwError(data.error);
                }
                if (!Array.isArray(data.result) || data.result.length === 0) {
                    this.data$.next([]);
                    return throwError("No results found");
                }
                this.data$.next(this.mapResponse(data.result));
                return of(true);
            })
        )
    }

    private mapResponse(data: any[]): (ResultModel | string)[] {
        const groupedData: { [stationId: string]: any[] } = data.reduce((prev, curr) => {
            (prev[curr.stationId] = prev[curr.stationId] || []).push(curr);
            return prev;
        }, {});


        const result: (ResultModel | string)[] = [];
        Object.entries(groupedData).forEach((entry) => {
            result.push(entry[0]);
            result.push(...entry[1].map((item) => ({
                ...item,
                reportTime: new Date(item.reportTime),
            })))
        });

        return result
    }

    private getBody(formRawValues: { types: { [type in MessageType]: boolean }, countries: string[], airports: string[] }): RequestModel {
        const selectedTypes = Object.entries(formRawValues.types).filter((entry) => entry[1]).map((entry) => entry[0].toUpperCase());
        const params: RequestModel["params"][0] = {
            id: "briefing" + String(this.briefingCounter++).padStart(2, "0"),
            reportTypes: selectedTypes.map((type) => type.toUpperCase()) as MessageType[],
        };
        if (formRawValues.airports.length) {
            params.stations = formRawValues.airports.map((airport) => airport.toUpperCase());
        }
        if (formRawValues.countries.length) {
            params.countries = formRawValues.countries.map((country) => country.toUpperCase());
        }
        return {
            id: "query" + String(this.queryCounter++).padStart(2, "0"),
            method: "query",
            params: [params]
        }
    }

}
