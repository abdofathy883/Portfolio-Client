import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects/project';
import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'app-single-project',
  imports: [],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.css'
})
export class SingleProjectComponent implements OnInit{
  project!: Project;
  
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    const id =0
    this.projectService.getById(id).subscribe({
      next: (res) => {
        this.project = res;
      },
      error: (err) => {
        
      }
    })
  }
}
