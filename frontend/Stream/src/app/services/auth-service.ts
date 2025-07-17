import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { isCookie } from '../utils/cookies';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;
  private _isAuthenticated = new BehaviorSubject<boolean>(this.checkAuth());
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this._isAuthenticated.next(this.checkAuth());
    }
  }

  private checkAuth(): boolean {
    if (!this.isBrowser) return false;
    return isCookie('Authorization');
  }

  authenticate(response: string, toastr: any, route: any, router: any) {
    if (!this.isBrowser) return;

    toastr.success(response);

    const redirectUrl = route.snapshot.queryParamMap.get('redirect') || '/';

    router.navigateByUrl(redirectUrl);

    this._isAuthenticated.next(this.checkAuth());
  }

  isAuthenticated() {
    return this._isAuthenticated.value;
  }

  logout() {
    document.cookie = 'Authorization=; Path=/; Max-Age=0';
    this._isAuthenticated.next(false);
  }
}
