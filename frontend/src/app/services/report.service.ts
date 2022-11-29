import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  report?: {
    start_date?: string;
    end_date?: string;
  
  }

  API_SERVER = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

public readContacts(start_date,end_date) {
  // this.report = report;
  // let offsets = this.report.start_date;
  // let limits = this.report.end_date;
  const params = new HttpParams({
    fromObject: {
      start_date,
      end_date
    }
  });

  console.log(end_date);

  console.log(start_date);
 // console.log(limits);
  return this.httpClient.get<Contact[]>(`${this.API_SERVER}/report`,{params: params});
}
}