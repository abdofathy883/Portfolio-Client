import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { ContactForm } from '../../models/contact-form/contact-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private endpoint = 'contactform';
  constructor(private api: ApiService) {}

  send(form: ContactForm): Observable<boolean> {
    return this.api.post<boolean>(this.endpoint, form);
  }
}
