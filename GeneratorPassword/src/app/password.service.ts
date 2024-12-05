import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = 'https://seu-endpoint.com/api/salvar-senha';

  constructor(private http: HttpClient) { }

  sendPassword(password: string): Observable<any> {
    const generatedAt = this.getBrazilTime();

    const payload: any = {
      password,
      generatedAt
    };

    return this.http.post(this.apiUrl, payload);
  }

   getPasswordHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  private getBrazilTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    const brazilTime = new Date().toLocaleString('pt-BR', options);
    return brazilTime;
  }
}
