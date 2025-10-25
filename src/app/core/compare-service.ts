import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelResult } from '../models/results-models';
import { environment } from '../../environment.prod';


@Injectable({
  providedIn: 'root',
})
export class CompareService {
   private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  compare(prompt: string): Observable<ModelResult[]> {
    return this.http.post<ModelResult[]>(this.apiUrl, { prompt });
  }
}
