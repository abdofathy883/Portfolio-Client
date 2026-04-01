import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProject, Language } from '../../../models/projects/i-project';
import { ProjectService } from '../../../services/projects/project.service';
import { LanguageService } from '../../../services/languages/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-projects-section',
  imports: [RouterLink],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  projects: IProject[] = [];
  currentLanguage: Language = Language.en;

  private projectService = inject(ProjectService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // this.currentLanguage = this.languageService.currentLang();
    this.loadProjects();
    // this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.loadProjects();
    // });
    // Initialize AOS animations
    // @ts-ignore
    // import('aos').then((AOS) => {
    //   AOS.init();
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects() {
    this.projectService.getAll(this.currentLanguage).subscribe({
      next: (res) => {
        this.projects = res;
        console.log(this.projects)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  goToProject(slug: string) {
    this.router.navigate(['projects', slug]);
  }
}
