import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, take } from 'rxjs';
import { User } from '../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}`).pipe(
      catchError((err) => {
        console.error('HTTP Error:', err.status, err.message);
        return of([]);
      })
    );
  }
}
