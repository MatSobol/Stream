import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token: string = '';
  headerName: string = '';
  private http = inject(HttpClient);

  setCsrf(csrf: string, headerName: string): void {
    this.token = csrf;
    this.headerName = headerName;
  }

  private createHeaders(additionalHeaders?: {
    [key: string]: string;
  }): HttpHeaders {
    let headers = new HttpHeaders({
      [this.headerName]: this.token,
    });

    if (additionalHeaders) {
      for (const key of Object.keys(additionalHeaders)) {
        headers = headers.set(key, additionalHeaders[key]);
      }
    }

    return headers;
  }

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: { [key: string]: string }
  ): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.createHeaders(headers),
      params,
    });
  }

  post<T>(
    url: string,
    body: any,
    headers?: { [key: string]: string }
  ): Observable<string> {
    return this.http.post(url, body, {
      headers: this.createHeaders(headers),
      responseType: 'text' as const,
      withCredentials: true
    });
  }

  put<T>(
    url: string,
    body: any,
    headers?: { [key: string]: string }
  ): Observable<T> {
    return this.http.put<T>(url, body, {
      headers: this.createHeaders(headers),
    });
  }

  delete<T>(url: string, headers?: { [key: string]: string }): Observable<T> {
    return this.http.delete<T>(url, {
      headers: this.createHeaders(headers),
    });
  }
}
