import { Observable } from 'rxjs/Observable';
import { Http } from './http';
import { ApplicationError } from '../core';

const SPLITWISE_API_KEY = 'p9QvCWyKK3y1yLrsm4m9vP6BrkdHadjiiHwyqrI3';
const SPLITWISE_SITE = 'https://secure.splitwise.com';
const SPLITWISE_AUTHORIZE_URL = '/authorize';
const SPLITWISE_TOKEN_URL = 'https://splitwise.azurewebsites.net/api/auth_dev';

export class Splitwise {
    private _http: Http;

    constructor(token: string) {
        this._http = new Http();
        this._http.defaultHeaders = {
            'Authorization': `Bearer ${token}`
        };
    }

    getCurrentUser(): Observable<IUser> {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_current_user')
            .flatMap(res => res.json())
            .map(({ user }) => user as IUser)
            .catch(error => {
                console.error(new ApplicationError('Cannot get current user', error));
                return null;
            });
    }

    getCurrencies() {
        return this._http.get('https://secure.splitwise.com/api/v3.0/get_currencies');
    }
}
