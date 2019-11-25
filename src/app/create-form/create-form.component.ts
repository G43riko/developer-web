import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from "../shared/services/data.service";
import {AppService} from "../shared/services/app.service";
import {AbstractControl, FormBuilder, ValidatorFn} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
    public loading = false;
    public readonly form = this.formBuilder.group({
        types: this.formBuilder.group({
            metar: false,
            sigmet: false,
            taf: false,
        }, {
            validators: [this.messageTypeValidator()]
        }),
        airports: [[]],
        countries: [[]],
    }, {
        validators: [this.countryAndAirportValidator()]
    });
    // public readonly form = this.formBuilder.group({
    //     types: this.formBuilder.group({
    //         metar: true,
    //         sigmet: false,
    //         taf: true,
    //     }, {
    //         validators: [this.messageTypeValidator()]
    //     }),
    //     airports: [["LKPR", "EGLL"]],
    //     countries: [["SQ"]],
    // }, {
    //     validators: [this.countryAndAirportValidator()]
    // });
    public airports$: Observable<string[]>;
    public countries$: Observable<string[]>;

    public constructor(private readonly formBuilder: FormBuilder,
                       private readonly dataService: DataService,
                       private readonly snackBar: MatSnackBar,
                       private readonly appService: AppService) {

        this.airports$ = this.dataService.getAllAirports();
        this.countries$ = this.dataService.getAllCountries();
    }

    messageTypeValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return Object.values(control.value).filter((item) => !!item).length > 0 ? null : {
                "missingType": "At least one message type must be selected"
            };
        };
    }

    countryAndAirportValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const isOk = (arr): boolean => {
                return Array.isArray(arr) && arr.length > 0
            };
            return isOk(control.value.airports) || isOk(control.value.countries) ? null : {
                "missingData": "At least one airport or country is required"
            };
        };
    }

    public onSubmit(): void {
        this.loading = true;
        this.form.disable();
        this.appService.search(this.form.value).pipe(finalize(() => {
            this.loading = false;
            this.form.enable();
        })).subscribe(() => {
        }, (error) => {
            this.snackBar.open(error, "Close", {
                duration: 2000,
            });
        });
    }
}
