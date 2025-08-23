import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Observable } from 'rxjs';
import { Project } from '../../models/projects/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private endpoint = 'projects'
  constructor(private api: ApiService) { }

  getAll(): Observable<Project[]> {
    return this.api.get<Project[]>(this.endpoint)
  }

  getById(id: number): Observable<Project> {
    return this.api.get<Project>(`${this.endpoint}/${id}`)
  }
}
