import { Http } from './http';
import { Utilities, Dictionary } from '@microsoft/office-js-helpers';
import { Observable } from 'rxjs/Observable';

const SPLITWISE_API_KEY = 'p9QvCWyKK3y1yLrsm4m9vP6BrkdHadjiiHwyqrI3';
const SPLITWISE_SITE = 'https://secure.splitwise.com';
const SPLITWISE_AUTHORIZE_URL = '/authorize';
const SPLITWISE_TOKEN_URL = 'https://splitwise.azurewebsites.net/api/auth_dev';
const SPLITWISE_TOKEN = 'xMvvT2KQu3VF7Th2BBTtnG1fOSnIfBbHvaDFLpX6';

export class Splitwise {
    private _http: Http;

    constructor() {
        this._http = new Http();
        this._http.defaultHeaders.add('Authorization', `Bearer ${SPLITWISE_TOKEN}`);
    }

    getCurrentUser() {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_current_user');
    }

    getCurrencies() {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_currencies');
    }
}
