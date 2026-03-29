import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Observable } from 'rxjs';
import { IProject, Language } from '../../models/projects/i-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private endpoint = 'projects'
  constructor(private api: ApiService) { }

  getAll(lang: Language): Observable<IProject[]> {
    return this.api.get<IProject[]>(`${this.endpoint}/${lang}`);
  }

  getBySlug(slug: string, lang: Language): Observable<IProject> {
    return this.api.get<IProject>(`${this.endpoint}/${slug}/${lang}`);
  }
}
