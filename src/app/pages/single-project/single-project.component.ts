import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProject, Language } from '../../models/projects/i-project';
import { ProjectService } from '../../services/projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../services/languages/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-project',
  imports: [],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.css'
})
export class SingleProjectComponent implements OnInit, OnDestroy {
  project!: IProject;
  currentLanguage: Language = Language.en;

  private destroy$ = new Subject<void>();
  
  private projectService = inject(ProjectService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.currentLanguage = this.languageService.currentLang();
    this.loadProject();
    // this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.loadProject();
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadProject() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.projectService.getBySlug(slug, this.currentLanguage).subscribe({
      next: (res) => {
        this.project = res;
        console.log(this.project)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
