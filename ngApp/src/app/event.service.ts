import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private base_url = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  getEvents():Observable<any>{
    return this.http.get<any>(this.base_url+'/events');
   }

   getSpecialEvents():Observable<any>{
     return this.http.get<any>(this.base_url+'/special');
   }
}
