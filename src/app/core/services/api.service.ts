import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { User } from '../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}`);
  }
}
