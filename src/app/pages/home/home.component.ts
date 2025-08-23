import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactSectionComponent } from '../home-components/contact-section/contact-section.component';
import { HeroSectionComponent } from '../home-components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from "../home-components/projects-section/projects-section.component";

@Component({
  selector: 'app-home',
  imports: [
    // TranslatePipe,
    ContactSectionComponent,
    HeroSectionComponent,
    ProjectsSectionComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
  

  
}
