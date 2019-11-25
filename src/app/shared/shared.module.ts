import {NgModule} from '@angular/core';
import {MaterialModule} from "./modules/material.module";
import {AutoChipsComponent} from './components/auto-chips/auto-chips.component';
import {CoreModule} from "./modules/core.module";
import {HighlightTextPipe} from './pipes/highlight-text.pipe';

@NgModule({
    imports: [
        MaterialModule,
        CoreModule,
    ],
    declarations: [
        AutoChipsComponent,
        HighlightTextPipe,
    ],
    exports: [
        AutoChipsComponent,
        HighlightTextPipe,
    ],
    providers: []
})
export class SharedModule {
}
