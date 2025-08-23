import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-section',
  imports: [],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {

  projects: any = [
    {
      id: 1,
      title: 'PlayStation Café Manager',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'A Windows desktop app for managing gaming time, drinks, and session reporting at local gaming cafés.',
      tech: ['.NET', 'WinForms', 'SQL Server'],
    },
    {
      title: 'E-Learning Platform',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Multi-role platform where instructors create courses and students access lessons, quizzes, and certificates.',
      tech: ['.NET Core', 'Angular', 'Entity Framework', 'DinkToPdf'],
    },
    {
      title: 'Marketing Agency Operations System',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Internal platform to manage services, employees, and tasks across multiple client campaigns.',
      tech: ['.NET 8', 'SQL Server', 'Bootstrap'],
    },
    {
      title: 'Multi-Tenant E-Commerce',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Scalable SaaS system allowing multiple vendors to manage products, variants, and orders on one shared backend.',
      tech: ['.NET', 'Entity Framework', 'Angular', 'Cloudinary'],
    },
    {
      title: 'Financial Tracking for Warehouses',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Inventory and payment tracking system designed for warehouse chains operating independently but under one owner.',
      tech: ['.NET Core', 'Razor Pages', 'SQL Server'],
    },
    {
      title: 'Zoom-Integrated Class Scheduler',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Backend system for scheduling Zoom classes dynamically via instructor accounts and assigning them to students.',
      tech: ['.NET Web API', 'Angular', 'Zoom API', 'OAuth'],
    },
    {
      title: 'Client Proposal Generator',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Dynamic tool for freelancers to generate personalized, multi-language proposals for client pitches.',
      tech: ['.NET', 'LaTeX', 'Bootstrap'],
    },
    {
      title: 'Certificate Generator for Courses',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'HTML-to-PDF certificate generation with instructor-issued, student-accessible document download feature.',
      tech: ['.NET', 'DinkToPdf', 'Angular'],
    },
    {
      title: 'Custom CRM Dashboard',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.dFfHwM2X_TUJA6CmFRIeeQHaE7?r=0&cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3',
      description:
        'Tailored CRM for a real estate agency with lead tracking, automated follow-ups, and performance reports.',
      tech: ['.NET', 'Chart.js', 'Angular'],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize AOS animations
    // @ts-ignore
    import('aos').then((AOS) => {
      AOS.init();
    });
  }

  loadProjects() {
    // this.projectService.getAll().subscribe({
    //   next: (res) => {
    //   },
    //   error: (err) => {
    //   }
    // })
  }

  goToProject(id: number) {
    this.router.navigate(['projects', id]);
  }
}
