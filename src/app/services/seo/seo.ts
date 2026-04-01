import {
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ISeoPage } from '../../models/seo/i-seo-page';
import { ApiService } from '../api-service/api.service';
import { Language } from '../../models/projects/i-project';

const SEO_KEY = makeStateKey<any>('seo-data');

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private endpoint: string = 'seo';
  private cache = new Map<string, ISeoPage>();

  private api = inject(ApiService);
  private meta = inject(Meta);
  private title = inject(Title);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  getSeo(
    route: string,
    lang: Language = Language.en,
  ): Observable<ISeoPage | null> {
    // Check in-memory cache first
    if (this.cache.has(route)) {
      const data = this.cache.get(route)!;
      this.applySeo(data);
      return of(data);
    }

    // Check TransferState (SSR -> Browser)
    if (this.transferState.hasKey(SEO_KEY)) {
      const data = this.transferState.get<ISeoPage>(SEO_KEY, null as any);
      this.transferState.remove(SEO_KEY);
      this.cache.set(route, data);
      this.applySeo(data);
      return of(data);
    }

    // Fetch from backend API
    return this.api.get<ISeoPage>(`${this.endpoint}/${lang}/${route}`).pipe(
      tap((data) => {
        this.cache.set(route, data);
        this.applySeo(data);

        // Store in TransferState if on server
        if (!isPlatformBrowser(this.platformId)) {
          this.transferState.set<ISeoPage>(SEO_KEY, data);
        }
      }),
      catchError((err) => {
        console.error('Failed to fetch SEO data', err);
        return of(null);
      }),
    );
  }

  applySeo(data: ISeoPage | null) {
    if (!data) return;

    this.title.setTitle(data.title || 'Default Title');

    this.updateMetaTag('description', data.description);
    this.updateMetaTag('keywords', data.keywords);

    this.updateMetaTag('og:title', data.ogTitle || data.title, true);
    this.updateMetaTag(
      'og:description',
      data.ogDescription || data.description,
      true,
    );
    this.updateMetaTag('og:image', data.ogImage || '', true);

    this.updateMetaTag('robots', data.robots || 'index,follow');
  }

  private updateMetaTag(
    nameOrProperty: string,
    content: string | undefined,
    isProperty = false,
  ) {
    if (!content) return;

    const selector = isProperty
      ? `property='${nameOrProperty}'`
      : `name='${nameOrProperty}'`;

    // Check if tag exists
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({
        [isProperty ? 'property' : 'name']: nameOrProperty,
        content,
      });
    } else {
      this.meta.addTag({
        [isProperty ? 'property' : 'name']: nameOrProperty,
        content,
      });
    }
  }
}
