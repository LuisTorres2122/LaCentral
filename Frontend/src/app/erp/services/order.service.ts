import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/order.model';
import { reportRequest } from '../models/orderHelper.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlapi:string = environment.apiurl+"/Order";

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get<any>(this.urlapi);
  }

  public createOrder(order: any): Observable<any>{
    return this.http.post<any>(this.urlapi, order);
  }

 /* public updateClient(id:number, client: Client): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,client);
  }*/

  public getLastId(): Observable<any>{
    let newUrl = this.urlapi + "/last";
    return this.http.get<any>(newUrl);
  }

  public getLastIdDetails(): Observable<any>{
    let newUrl = this.urlapi + "/lastDetails";
    return this.http.get<any>(newUrl);
  }

  public getReport(filter:reportRequest): Observable<any>{
    let newUrl = `${this.urlapi}/Report`;
    return this.http.post<any>(newUrl, filter);
  }

  public getPendingOrder(): Observable<any>{
    let newUrl = `${this.urlapi}/pending`;
    return this.http.get<any>(newUrl);
  }

  public updatePendingorder(id:number, data: any): Observable<any>{
    let newUrl = this.urlapi +"/"+id;
    return this.http.put<any>(newUrl,data);
  }

  public getOrders(client: string): Observable<any>{
    const urlWithId = `${this.urlapi}/Order?name=${client}`;
    return this.http.get<any>(urlWithId);
  }

  public getDetailOrder(id: number): Observable<any>{
    const urlWithId = `${this.urlapi}/DetailOrder?id=${id}`;
    return this.http.get<any>(urlWithId);
  }

}
