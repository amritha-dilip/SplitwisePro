import { Observable } from 'rxjs';
import { Dictionary } from '@microsoft/office-js-helpers';
import { extend, forEach } from 'lodash';
import { ApplicationError } from '../core';

export class Http {
    constructor(public defaultHeaders?: Dictionary<string>) {
        if (this.defaultHeaders == null) {
            this.defaultHeaders = new Dictionary<string>();
            this.defaultHeaders.add('Content-Type', 'application/json');
            this.defaultHeaders.add('Accept', '*/*');
        }
    }

    private _fetch(url: string, options?: RequestInit): Observable<Response> {
        let request = fetch(url, options);
        return Observable.fromPromise(request);
    }

    url(url: string, headers: Dictionary<string>) {
        forEach(headers, (value, key) => {
            url = url.replace(new RegExp(`{${key}}`, 'g'), value);
        });
        return url;
    }

    get(url: string, headers?: Dictionary<string>): Observable<Response> {
        let options = this._options('GET', headers);
        return this._fetch(url, options);
    }

    post(url: string, body: any, headers?: Dictionary<string>): Observable<Response> {
        let options = this._options('POST', headers, body);
        return this._fetch(url, options);
    }

    put(url: string, body: any, headers?: Dictionary<string>): Observable<Response> {
        let options = this._options('PUT', headers, body);
        return this._fetch(url, options);
    }

    patch(url: string, body: any, headers?: Dictionary<string>): Observable<Response> {
        let options = this._options('PATCH', headers, body);
        return this._fetch(url, options);
    }

    delete(url: string, headers?: Dictionary<string>): Observable<Response> {
        let options = this._options('DELETE', headers);
        return this._fetch(url, options);
    }

    private _options(method: string, additionalHeaders?: Dictionary<string>, body?: any): RequestInit {
        let headers = extend({}, this.defaultHeaders.lookup());

        if (!(additionalHeaders == null)) {
            headers = extend({}, headers, additionalHeaders.lookup());
        }

        let options: any = <RequestInit>{
            method,
            headers
        };

        if (!(body == null)) {
            options[body] = JSON.stringify(body);
        }

        return options;
    }
}
