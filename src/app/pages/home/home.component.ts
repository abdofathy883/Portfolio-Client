import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../services/contact-form/contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactForm } from '../../models/contact-form/contact-form';
import { ProjectService } from '../../services/projects/project.service';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  isLoading: boolean = false;
  successMessage: boolean = false;
  errorMessage: boolean = false;
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

  contactForm!: FormGroup;

  constructor(
    private contactService: ContactService,
    // private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    // Initialize AOS animations
    // @ts-ignore
    import('aos').then((AOS) => {
      AOS.init();
    });

    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      message: [''],
      timeStamp:[new Date()]
    })
  }

  copyToClipboard(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText;
      navigator.clipboard.writeText(text).then(() => {
        // const tooltip = bootstrap.Tooltip.Get
      });
      alert('Copied!');
    } else {
      alert('Element not found!');
    }
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
    this.router.navigate(['projects', id])
  }

  onSubmit() {
    debugger;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    const newForm: ContactForm = {
      FullName: this.contactForm.value.fullName,
      PhoneNumber: this.contactForm.value.phoneNumber,
      Email: this.contactForm.value.email,
      Message: this.contactForm.value.message,
      TimeStamp: this.contactForm.value.timeStamp
    }
    this.contactService.send(newForm).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = true;
        this.contactForm.reset();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = true;
      }
    })
  }
}
