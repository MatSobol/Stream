import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  makeStateKey,
  PLATFORM_ID,
  signal,
  TransferState,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppSettings } from '../../app.settings';

const IMAGES_KEY = makeStateKey<string[]>('images');
const count = 20;

@Component({
  selector: 'app-images',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './images.html',
  styleUrl: './images.sass',
})
export class Images {
  images = signal<string[]>([]);
  transferState = inject(TransferState);

  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  isLoading = false;
  private pageNumber = 0;

  constructor() {
    if (isPlatformServer(this.platformId)) {
      const params = new HttpParams().set('start', 0).set('count', 20);
      this.http
        .get<string[]>(AppSettings.IMAGES_URL, { params })
        .subscribe((result) => {
          this.images.set(result);
          this.transferState.set(IMAGES_KEY, result);
        });
    } else if (isPlatformBrowser(this.platformId)) {
      let imagesString = this.transferState.get<string[]>(IMAGES_KEY, []);
      console.log(imagesString);
      if (imagesString.length == 0) {
        const params = new HttpParams().set('start', 0).set('count', 20);
        this.isLoading = true;
        this.http
          .get<string[]>(AppSettings.IMAGES_URL, { params })
          .subscribe((result) => {
            this.isLoading = false;
            this.images.set(result);
          });
      }
      this.images.set(imagesString);
    }
  }

  @HostListener('window:scroll', [])
  scroll(): void {
    if (
      window.innerHeight + window.scrollY < document.body.offsetHeight ||
      this.isLoading
    ) {
      return;
    }
    console.log('bottom of the page');
    this.pageNumber += 1;
    this.isLoading = true;
    const params = new HttpParams()
      .set('start', this.pageNumber * count)
      .set('count', 20);
    this.http
      .get<string[]>(AppSettings.IMAGES_URL, { params })
      .subscribe((result) => {
        this.isLoading = false;
        this.images.update((el) => [...el, ...result]);
      });
  }
}
