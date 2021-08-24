import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details, Order } from '../intefaces/order.interface';
import { Store } from '../intefaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  saveDetailsOrder(details: Details): Observable<Details> {
    return this.http.post<Details>(`${this.apiUrl}/detailsOrders`, details);
  }
}
