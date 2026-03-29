import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../models/projects/i-project';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  init() {
    // const defaultLang = Language.en.toString();

    // if (isPlatformBrowser(this.platformId)) {
    //   const saved = localStorage.getItem('lang') ?? defaultLang;
    //   this.translate.use(saved);
    //   document.documentElement.lang = saved;
    //   const dir = saved === Language.en.toString() ? 'ltr' : 'rtl';
    //   document.documentElement.dir = dir;
    //   document.body.dir = dir;
    // } else {
    //   this.translate.use(defaultLang);
    // }

      this.translate.use(Language.en.toString());
  }

  switchLanguage(lang: Language) {
    let newLang;
    if (lang == 0) {
      newLang = 'ar';
    } else {
      newLang = 'en'
    }
    this.translate.use(newLang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', newLang);
      document.documentElement.lang = newLang;
      const dir = lang === Language.en ? 'ltr' : 'rtl';
      document.documentElement.dir = dir;
      document.body.dir = dir;
    }
  }

  currentLang() {
    const lang = this.translate.getCurrentLang();
    if (lang === 'ar') {
      return Language.ar;
    }
    else {
      return Language.en
    }
  }
}
