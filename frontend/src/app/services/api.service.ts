import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './../models/contact';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pagination?: {
    limit?: number;
    offset?: number;
    page?: number
  }
  API_SERVER = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public readContacts(pagination = {}) {
    this.pagination = pagination;
    let offsets = this.pagination.offset || 0;
    let limits = this.pagination.limit || 100;

        let offset=offsets.toString();
        let limit=limits.toString();
    const params = new HttpParams({
      fromObject: {
        offset,
        limit
      }
    });
    return this.httpClient.get<Contact[]>(`${this.API_SERVER}/contacts`,{params: params});
  }

  

  public createContact(contact: any) {
    return this.httpClient.post<Contact>(`${this.API_SERVER}/contacts/create`, contact);
  }

  public updateContact(contact: any) {
    return this.httpClient.put<Contact>(`${this.API_SERVER}/contacts/${contact.id}/update`, contact);
  }

  public deleteContact(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/contacts/${id}/delete`);
  }

  

}
