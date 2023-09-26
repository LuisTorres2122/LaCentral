import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlapi:string = environment.apiurl+"/Client";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Client>{
    return this.http.get<Client>(this.urlapi);
  }

  public createClient(client: Client): Observable<any>{
    return this.http.post<any>(this.urlapi, client);
  }

  public updateClient(id:number, client: Client): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,client);
  }

  public deleteClient(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
