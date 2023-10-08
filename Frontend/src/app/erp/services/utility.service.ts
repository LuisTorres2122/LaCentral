import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passepartout, SPassepartout } from '../models/passepartout.model';
import { Utility } from '../models/utility.models';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private urlapi:string = environment.apiurl+"/Utility";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Utility>{
    return this.http.get<Utility>(this.urlapi);
  }

  public updatePass(id:number, utility: Utility): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,utility);
  }


}
