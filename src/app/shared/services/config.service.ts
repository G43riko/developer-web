import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private static readonly API_LINK = "https://ogcie.iblsoft.com/ria/opmetquery";

    public constructor() {

    }

    public get apiLink(): string {
        return ConfigService.API_LINK;
    }
}
