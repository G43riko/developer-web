import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../shared/services/app.service";
import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";
import {ResultModel} from "../shared/models/result.model";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-result-preview',
    templateUrl: './result-preview.component.html',
    styleUrls: ['./result-preview.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ResultPreviewComponent implements OnInit, OnDestroy {
    public readonly displayedColumns: string[] = ['stationId', 'reportTime', 'textHTML'];
    @ViewChild("tableWrapper", {static: true}) public tableWrapper: ElementRef<HTMLDivElement>;
    public expandedElement: ResultModel | null;
    private subscription: Subscription;

    public constructor(public readonly appService: AppService) {
    }

    public ngOnInit(): void {
        this.subscription = this.appService.data$.pipe(delay(10)).subscribe(() => {
            this.tableWrapper.nativeElement.scrollIntoView();
        })
    }

    public isTitle(row: any): boolean {
        return typeof row === "string";
    }

    public getFirstColumnValue(element: any): string {
        return typeof element === "string" ? element : element.queryType;
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    public onClickOnRow(row: any) {
        if (this.isTitle(row)) {
            return false;
        }
        this.expandedElement = this.expandedElement === row ? null : row
    }
}
