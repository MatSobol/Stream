import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './services/http';

interface CsrfResponse {
  parameterName: string;
  token: string;
  headerName: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private httpService = inject(HttpService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .get<CsrfResponse>(
          'http://localhost:8080/auth/csrf?parameterName=string&token=string&headerName=string'
        )
        .subscribe({
          next: (response) => {
            document.cookie = `XSRF-TOKEN=${response.token}; Path=/`;
            this.httpService.setCsrf(response.token, response.headerName);
          },
          error: (err) => {
            console.error('Error fetching CSRF token', err);
          },
        });
    }
  }
}
