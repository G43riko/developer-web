import {NgModule,} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    exports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    declarations: []
})
export class CoreModule {
}
