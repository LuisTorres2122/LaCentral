import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frame, SFrame } from '../models/frame.model';



@Injectable({
  providedIn: 'root'
})
export class FrameService {
  private urlapi:string = environment.apiurl+"/Frame";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Frame>{
    return this.http.get<Frame>(this.urlapi);
  }

  public getMaterial(): Observable<any>{
    let newUrl = this.urlapi+"/material";
    return this.http.get<any>(newUrl);
  }

  public createFrame(frame: SFrame): Observable<any>{
    return this.http.post<any>(this.urlapi, frame);
  }

  public updateFrame(id:number, frame: SFrame): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,frame);
  }

  public deleteFrame(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
