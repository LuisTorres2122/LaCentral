import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  User } from '../models/user.model';
import {tokenUser } from '../../landing-page/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlapi:string = environment.apiurl+"/User";

  constructor(private http: HttpClient) { }

  public getData(): Observable<User>{
    return this.http.get<User>(this.urlapi);
  }

  public createUser(user: User): Observable<any>{
    return this.http.post<any>(this.urlapi, user);
  }

  public login(user: tokenUser): Observable<any>{
    let newUrl = this.urlapi + "/Autenticar";
    return this.http.post<any>(newUrl, user);
  }

 

  public updateUser(id:number, user: User): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,user);
  }

  public deleteUser(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
