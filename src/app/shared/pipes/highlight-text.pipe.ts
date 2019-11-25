import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {
    private static readonly HIGHLIGHTED_KEYS = ["BKN", "FEW", "SCT"];
    private static readonly SEARCHED_REGEX = new RegExp(`((${HighlightTextPipe.HIGHLIGHTED_KEYS.join("|")})\\d{3})`, "g");

    public transform(value: string): any {
        if (!value) {
            return value;
        }
        return value.replace(HighlightTextPipe.SEARCHED_REGEX, (value, p1) => {
            try {
                return `<span class="${parseInt(p1.substring(3), 10) <= 30 ? "red" : "blue"}">${p1}</span>`;
            } catch (e) {
                return p1;
            }
        });
    }

}
