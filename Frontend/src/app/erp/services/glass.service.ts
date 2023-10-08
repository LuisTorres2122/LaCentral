import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Glass, SGlass } from '../models/glass.model';


@Injectable({
  providedIn: 'root'
})
export class GlassService {
  private urlapi:string = environment.apiurl+"/Glass";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Glass>{
    return this.http.get<Glass>(this.urlapi);
  }

  public getMaterial(): Observable<any>{
    let newUrl = this.urlapi+"/material";
    return this.http.get<any>(newUrl);
  }

  public createGlass(glass: SGlass): Observable<any>{
    return this.http.post<any>(this.urlapi, glass);
  }

  public updateGlass(id:number, glass: SGlass): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,glass);
  }

  public deleteGlass(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
