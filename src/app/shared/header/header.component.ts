import { Component, HostListener, OnInit } from '@angular/core';
import { LanguageService } from '../../services/languages/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
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
  currentLang = 'en'; // or get from your language service

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.isLanguageMenuOpen = false;
    // Your existing language switch logic
    this.langService.switchLanguage(lang);
    console.log(this.currentLang)
  }

  // Add scroll listener to detect active section
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Logic to update activeSection based on scroll position
  }
}
