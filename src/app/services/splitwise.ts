import { Http } from './http';
import { Authenticator, Utilities, Dictionary } from '@microsoft/office-js-helpers';
import { Observable } from 'rxjs/Observable';

const SPLITWISE_API_KEY = 'p9QvCWyKK3y1yLrsm4m9vP6BrkdHadjiiHwyqrI3';
const SPLITWISE_SITE = 'https://secure.splitwise.com';
const SPLITWISE_AUTHORIZE_URL = '/authorize';
const SPLITWISE_TOKEN_URL = 'https://splitwise.azurewebsites.net/api/auth_dev';

export class Splitwise {
    private _authenticator: Authenticator;
    private _http: Http;

    constructor() {
        this._authenticator = new Authenticator();
        this._http = new Http();
        this._authenticator.endpoints.add('Splitwise', {
            baseUrl: SPLITWISE_SITE,
            authorizeUrl: SPLITWISE_AUTHORIZE_URL,
            clientId: SPLITWISE_API_KEY,
            state: true,
            responseType: 'token',
            nonce: true
        });
    }

    login() {
        let code = this._authenticator.authenticate('Splitwise');
        return Observable.fromPromise(code)
            .do(token => this._http.defaultHeaders.add('Authorization', `Bearer ${token.access_token}`))
            .mergeMap(token => this.getCurrentUser());
    }

    getCurrentUser() {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_current_user');
    }

    getCurrencies() {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_currencies');
    }
}
