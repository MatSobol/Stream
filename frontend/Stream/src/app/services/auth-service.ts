import {
  Injectable,
  Inject,
  PLATFORM_ID,
  computed,
  effect,
  signal,
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal<boolean>(false);
  readonly isAuthenticated = this._isAuthenticated;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(REQUEST) private request: Request
  ) {
    this.init();
  }

  private init() {
    if (isPlatformServer(this.platformId)) {
      const cookie = this.request?.headers?.get('cookie') || '';
      this._isAuthenticated.set(cookie.includes('Authorization'));
    }

    if (isPlatformBrowser(this.platformId)) {
      const cookie = document.cookie || '';
      this._isAuthenticated.set(cookie.includes('Authorization'));
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
