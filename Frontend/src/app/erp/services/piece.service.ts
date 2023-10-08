import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';


@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private urlapi:string = environment.apiurl+"/Obra";

  constructor(private http: HttpClient) { }

  public getData(): Observable<Piece>{
    return this.http.get<Piece>(this.urlapi);
  }

  public createPiece(piece: Piece): Observable<any>{
    return this.http.post<any>(this.urlapi, piece);
  }

  public updatePiece(id:number, piece: Piece): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.put<any>(newUrl,piece);
  }

  public deletePiece(id:number): Observable<any>{
    let newUrl = this.urlapi + "/"+id;
    return this.http.delete<any>(newUrl);
  }

}
