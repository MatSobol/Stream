export const getCookie = (name: string): string | null => {
  const match = document?.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export const isCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};
