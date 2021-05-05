import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NodeEntity } from '../interfaces/NodeEntity';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private serverUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getNodes(): Observable<NodeEntity[]> {
    return this.http.get<NodeEntity[]>(`${this.serverUrl}/node/status`);
  }

  getNodeData(name: string): Observable<Object> {
    return this.http.get<Object>(`${this.serverUrl}/data/${name}`);
  }
}
