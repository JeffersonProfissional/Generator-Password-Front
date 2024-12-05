import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  sendPassword(requestBody: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/generate-password`, requestBody 
    );
  }
  

  getPasswordHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/api/password_history');
  }
}
