export class AppSettings {
  public static readonly API_URL = 'http://localhost:8080';
  public static readonly CSRF_URL = AppSettings.API_URL + '/auth/csrf';
  public static readonly LOGIN_URL = AppSettings.API_URL + '/auth/login';
  public static readonly REGISTER_URL = AppSettings.API_URL + '/auth/register';
}
