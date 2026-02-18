import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../../../models/contact-form/contact-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact-form/contact.service';
import { ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent implements OnInit{
  siteKey: string = '6Lcwr28sAAAAAB2fezZ28X0jAp0SZKIsA8pyr5Av';
  isSending: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  contactForm!: FormGroup;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      message: [''],
      website: ['']
    })
  }

  onSubmit() {
    // if (this.contactForm.invalid) {
    //   this.contactForm.markAllAsTouched();
    //   this.isLoading = false;
    //   return;
    // }
    // this.isLoading = true;
    // const newForm: ContactForm = {
    //   fullName: this.contactForm.value.fullName,
    //   phoneNumber: this.contactForm.value.phoneNumber,
    //   email: this.contactForm.value.email,
    //   message: this.contactForm.value.message,
    //   recaptchaToken: this.contactForm.value.timeStamp
    // }
    // this.contactService.send(newForm).subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     this.successMessage = true;
    //     this.contactForm.reset();
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //     this.errorMessage = true;
    //   }
    // })

    if (this.contactForm.invalid || this.isSending) return;

    this.isSending = true;
    this.reCaptchaV3Service.execute(
      this.siteKey,
      'contact_submit',
      (token) => {
        const entry: ContactForm = {
          fullName: this.contactForm.get('fullName')?.value ?? '',
          phoneNumber: this.contactForm.get('phoneNumber')?.value ?? '',
          email: this.contactForm.get('email')?.value ?? '',
          message: this.contactForm.get('message')?.value ?? '',
          website: this.contactForm.get('website')?.value || undefined,
          recaptchaToken: token,
        };
        this.contactService.send(entry).subscribe({
          next: () => {
            this.contactForm.reset();
            this.isSending = false;
            this.successMessage = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.';
            // optional: show success message
          },
          error: (error) => {
            this.isSending = false;
            // optional: show error message
            this.errorMessage = error.error;
            console.log('Failed to submit contact form', error);
          },
        });
      },
      { useGlobalDomain: false },
    );
  }
}
