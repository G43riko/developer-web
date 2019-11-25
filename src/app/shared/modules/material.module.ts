import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        MatTableModule,
        MatProgressBarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatSnackBarModule,
        MatAutocompleteModule,
    ],
    declarations: []
})
export class MaterialModule {
}
