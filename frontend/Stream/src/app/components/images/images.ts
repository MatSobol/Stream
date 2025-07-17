import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-images',
  imports: [],
  templateUrl: './images.html',
  styleUrl: './images.sass',
})
export class Images {
  array: number[] = [];

  private platformId = inject(PLATFORM_ID);

  constructor() {}
}
