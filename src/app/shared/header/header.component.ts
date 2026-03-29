import { Language } from './../../models/projects/i-project';
import { Component, HostListener, OnInit } from '@angular/core';
import { LanguageService } from '../../services/languages/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.langService.currentLang();
  }
 

  isMenuOpen = false;
  isLanguageMenuOpen = false;
  activeSection = 'home';
  currentLang: Language = Language.en; // or get from your language service

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // toggleLanguageMenu() {
  //   this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  // }

  // switchLanguage(lang: Language) {
  //   this.currentLang = lang;
  //   this.isLanguageMenuOpen = false;
  //   // Your existing language switch logic
  //   this.langService.switchLanguage(lang);
  // }

  // getCurrentLangLabel(lang: number) : string {
  //   if (lang == 0) {
  //     return 'AR';
  //   } else {
  //     return 'EN';
  //   }
  // }
}
