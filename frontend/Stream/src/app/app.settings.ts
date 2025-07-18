export class AppSettings {
  public static readonly API_URL = 'http://localhost:8080';
  public static readonly MOCK_URL = 'http://localhost:5097';
  public static readonly CSRF_URL = AppSettings.API_URL + '/auth/csrf';
  public static readonly LOGIN_URL = AppSettings.API_URL + '/auth/login';
  public static readonly REGISTER_URL = AppSettings.API_URL + '/auth/register';
  public static readonly IMAGES_URL = AppSettings.MOCK_URL + '/images';
}
