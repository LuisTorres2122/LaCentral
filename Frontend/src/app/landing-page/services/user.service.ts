import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlapi:string = environment.apiurl+"/User";

  constructor(private http: HttpClient) { }

  public getToken(user: User): Observable<any>{
    let newUrl = this.urlapi + "/Autenticar";
    return this.http.post<any>(newUrl, user);
  }


}
