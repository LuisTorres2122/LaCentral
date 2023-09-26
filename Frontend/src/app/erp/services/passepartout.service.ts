import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passepartout, SPassepartout } from '../models/passepartout.model';



@Injectable({
  providedIn: 'root'
})
export class PassepartoutService {
  private urlapi:string = environment.apiurl+"/Passepartout";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Passepartout>{
    return this.http.get<Passepartout>(this.urlapi);
  }

  public getMaterial(): Observable<any>{
    let newUrl = this.urlapi+"/material";
    return this.http.get<any>(newUrl);
  }

  public createPass(passe: SPassepartout): Observable<any>{
    return this.http.post<any>(this.urlapi, passe);
  }

  public updatePass(id:number, passe: SPassepartout): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,passe);
  }

  public deletePass(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
