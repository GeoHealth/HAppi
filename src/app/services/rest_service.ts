import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions, Http, Response} from "@angular/http";

@Injectable()
export class RestService {
  http: Http;
  apiDomainName = 'localhost';
  apiPort = '3000';

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Return the URL of the REST API. It always ends with a '/'
   * @returns {string} example: localhost:3000/v1/
   */
  getBaseURL(): string {
    return 'http://' + this.apiDomainName + ':' + this.apiPort + '/';
  }

  /**
   * Return the base URL plus the given path
   * @param path a path (bot starting with a '/')
   * @returns {string}
   */
  getFullURL(path): string {
    return this.getBaseURL() + path;
  }

  /**
   * Return a simple headers options for JSON content
   * @returns {RequestOptions}
   */
  static generateJSONHeadersOptions(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  static handlePostResponse(res: Response) {
    return res;
  }

  static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }


}
