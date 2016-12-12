import { Observable } from 'rx-lite';
import { forEach } from 'lodash';
import { ApplicationError } from '../core';

export type Headers = { [index: string]: string };

export class Http {
    constructor(public defaultHeaders?: Headers) {
        if (this.defaultHeaders == null) {
            let headers = {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            };

            this.defaultHeaders = { ...headers, ...this.defaultHeaders };
        }
    }

    private _fetch(url: string, options?: RequestInit): Observable<Response> {
        let request = fetch(url, options);
        return Observable.fromPromise(request);
    }

    url(url: string, headers: Headers) {
        forEach(headers, (value, key) => {
            url = url.replace(new RegExp(`{${key}}`, 'g'), value);
        });
        return url;
    }

    get(url: string, headers?: Headers): Observable<Response> {
        let options = this._options('GET', headers);
        return this._fetch(url, options);
    }

    post(url: string, body: any, headers?: Headers): Observable<Response> {
        let options = this._options('POST', headers, body);
        return this._fetch(url, options);
    }

    put(url: string, body: any, headers?: Headers): Observable<Response> {
        let options = this._options('PUT', headers, body);
        return this._fetch(url, options);
    }

    patch(url: string, body: any, headers?: Headers): Observable<Response> {
        let options = this._options('PATCH', headers, body);
        return this._fetch(url, options);
    }

    delete(url: string, headers?: Headers): Observable<Response> {
        let options = this._options('DELETE', headers);
        return this._fetch(url, options);
    }

    private _options(method: string, additionalHeaders?: Headers, body?: any): RequestInit {
        let headers = { ...this.defaultHeaders, ...additionalHeaders };
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
