import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { ContactForm } from '../../models/contact-form/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private endpoint = 'contactform'
  constructor(private api: ApiService) { }

  send(form: ContactForm) {
    return this.api.post(this.endpoint, form);
  }
}
