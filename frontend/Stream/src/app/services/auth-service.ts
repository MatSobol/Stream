import { Injectable, Inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(REQUEST) private request: Request
  ) {
    this.init();
  }

  private init() {
    if (isPlatformServer(this.platformId)) {
      const cookie = this.request?.headers?.get('cookie') || '';
      this._isAuthenticated.next(cookie.includes('Authorization'));
    }

    if (isPlatformBrowser(this.platformId)) {
      const cookie = document.cookie || '';
      this._isAuthenticated.next(cookie.includes('Authorization'));
    }
  }

  authenticate(response: string, toastr: any, route: any, router: any) {
    toastr.success(response);
    const redirectUrl = route.snapshot.queryParamMap.get('redirect') || '/';
    router.navigateByUrl(redirectUrl);
    this._isAuthenticated.next(true);
  }

  isAuthenticated() {
    return this._isAuthenticated.value;
  }

  logout() {
    document.cookie = 'Authorization=; Path=/; Max-Age=0';
    this._isAuthenticated.next(false);
  }
}
