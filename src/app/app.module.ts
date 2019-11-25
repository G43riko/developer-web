import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./shared/modules/material.module";

import {AppComponent} from "./app.component";
import {HelloComponent} from "./hello.component";
import {SharedModule} from "./shared/shared.module";
import {CreateFormComponent} from "./create-form/create-form.component";
import {CoreModule} from "./shared/modules/core.module";
import {ResultPreviewComponent} from './result-preview/result-preview.component';

@NgModule({
    imports: [
        CoreModule,
        BrowserAnimationsModule,
        MaterialModule,
        SharedModule],
    declarations: [
        AppComponent,
        HelloComponent,
        CreateFormComponent,
        ResultPreviewComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
