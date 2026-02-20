import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = (import.meta as any).env.NG_APP_BIBLE_GATEWAY_URL;

  getVerse(version: string): Observable<any> {
    const url = `${this.baseUrl}?format=json&version=${version}`;
    return this.http.jsonp(url, 'callback').pipe(
      map((data: any) => data.votd)
    );
  }
}
