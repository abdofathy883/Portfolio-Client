import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../../../models/contact-form/contact-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact-form/contact.service';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent implements OnInit{
  isLoading: boolean = false;
  successMessage: boolean = false;
  errorMessage: boolean = false;

  contactForm!: FormGroup;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      message: [''],
      timeStamp:[new Date()]
    })
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
