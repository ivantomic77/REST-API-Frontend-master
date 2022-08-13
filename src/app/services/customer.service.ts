import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {Customer} from '../Customer';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': '',
  })
}

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private apiUrl = 'http://localhost:8081/'

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl + 'customer');
  }

  getFile(id:number): void{
    window.location.href=`${this.apiUrl}/customer/getFile/${id}`;
  }

  deleteCustomer(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}customer/delete/${id}`);
  }

  postCustomer(customer:FormData): Observable<any>{
    console.log(customer.get('firstName'));
    return this.http.post<any>(`${this.apiUrl}customer/new`, customer);
  }

  updateCustomer(customer:FormData): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}customer/put/${customer.get('id')}`, customer);
  }
}
