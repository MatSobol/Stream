import {
  Injectable,
  Inject,
  PLATFORM_ID,
  computed,
  effect,
  signal,
  inject,
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private request = inject(REQUEST);
  private _isAuthenticated = signal<boolean>(this.init());
  readonly isAuthenticated = this._isAuthenticated;

  constructor() {}

  private init() {
    let cookie;
    if (isPlatformServer(this.platformId)) {
      cookie = this.request?.headers?.get('cookie') || '';
    }
    if (isPlatformBrowser(this.platformId)) {
      cookie = document.cookie || '';
    }
    if (cookie) {
      return cookie.includes('Authorization');
    } else {
      return false;
    }
  }

  authenticate(response: string, toastr: any, route: any, router: any) {
    toastr.success(response);
    const redirectUrl = route.snapshot.queryParamMap.get('redirect') || '/';
    router.navigateByUrl(redirectUrl);
    this._isAuthenticated.set(true);
  }

  isAuthenticatedValue(): boolean {
    return this._isAuthenticated();
  }

  logout() {
    document.cookie = 'Authorization=; Path=/; Max-Age=0';
    this._isAuthenticated.set(false);
  }
}
