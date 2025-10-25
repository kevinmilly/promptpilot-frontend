import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelResult } from '../models/results-models';


@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private apiUrl = 'https://hallowed-cobweb-wr9wxqrp6442gvv7-3000.app.github.dev/compare'; // adjust if deployed

  constructor(private http: HttpClient) {}

  compare(prompt: string): Observable<ModelResult[]> {
    return this.http.post<ModelResult[]>(this.apiUrl, { prompt });
  }
}
