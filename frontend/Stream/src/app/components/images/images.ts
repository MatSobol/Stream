import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
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

const IMAGES_KEY = makeStateKey<VideoItem[]>('images');
const count = 40;

interface VideoItem {
  title: string;
  image: string;
  previewUrl: string;
  icon: string;
}

@Component({
  selector: 'app-images',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './images.html',
  styleUrl: './images.sass',
})
export class Images {
  transferState = inject(TransferState);
  sanitizer = inject(DomSanitizer);

  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private pageNumber = 0;

  images = signal<VideoItem[]>([]);
  hoverIndex = signal(-1);
  isLoading = false;
  hoverTimeout: NodeJS.Timeout | undefined;

  constructor() {
    if (isPlatformServer(this.platformId)) {
      const params = new HttpParams().set('start', 0).set('count', count);
      this.http
        .get<VideoItem[]>(AppSettings.IMAGES_URL, { params })
        .subscribe((result) => {
          this.images.set(result);
          this.transferState.set(IMAGES_KEY, result);
        });
    } else if (isPlatformBrowser(this.platformId)) {
      let imagesString = this.transferState.get<VideoItem[]>(IMAGES_KEY, []);
      if (imagesString.length == 0) {
        const params = new HttpParams().set('start', 0).set('count', count);
        this.isLoading = true;
        this.http
          .get<VideoItem[]>(AppSettings.IMAGES_URL, { params })
          .subscribe((result) => {
            this.isLoading = false;
            this.images.set(result);
          });
        return;
      }
      this.images.set(imagesString);
    }
  }

  getSafeURl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  enter(index: number) {
    this.hoverTimeout = setTimeout(() => {
      this.hoverIndex.set(index);
    }, 1000);
  }
  leave() {
    clearTimeout(this.hoverTimeout);
    this.hoverIndex.set(-1);
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
      .set('count', count);
    this.http
      .get<VideoItem[]>(AppSettings.IMAGES_URL, { params })
      .subscribe((result) => {
        this.isLoading = false;
        this.images.update((el) => [...el, ...result]);
      });
  }
}
