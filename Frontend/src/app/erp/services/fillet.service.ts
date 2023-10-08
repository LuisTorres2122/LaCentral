import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fillet, SFillet } from '../models/fillet.model';


@Injectable({
  providedIn: 'root'
})
export class FilletService {
  private urlapi:string = environment.apiurl+"/Fillet";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Fillet>{
    return this.http.get<Fillet>(this.urlapi);
  }

  public getMaterial(): Observable<any>{
    let newUrl = this.urlapi+"/material";
    return this.http.get<any>(newUrl);
  }

  public createFillet(fillet: SFillet): Observable<any>{
    return this.http.post<any>(this.urlapi, fillet);
  }

  public updateFillet(id:number, fillet: SFillet): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,fillet);
  }

  public deleteFillet(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
