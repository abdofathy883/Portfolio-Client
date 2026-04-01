import { inject, PLATFORM_ID } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Seo } from '../../services/seo/seo';
import { ISeoPage } from '../../models/seo/i-seo-page';
import { LanguageService } from '../../services/languages/language.service';
import { isPlatformBrowser } from '@angular/common';
import { catchError, of, timeout } from 'rxjs';

export const seoResolver: ResolveFn<ISeoPage | null> = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(null);
  }
  const seoService = inject(Seo);
  const languageService = inject(LanguageService);

  // currentRoute should match the route param expected by the backend
  // e.g. /about-us or /
  const url = route.url.map((s) => s.path).join('/');
  const currentRoute = url ? `/${url}` : '/';
  const cuurentLanguage = languageService.currentLang();
  // return seoService.getSeo(currentRoute, cuurentLanguage);
  return seoService.getSeo(currentRoute, cuurentLanguage).pipe(
    timeout(3000), // give it 3 seconds max
    catchError(() => of(null)),
  );
};
