import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = (import.meta as any).env.NG_APP_BIBLE_GATEWAY_URL;
  private readonly CACHE_KEY = 'daily_bible_verse';

  getVerse(version: string): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    
    if (typeof window !== 'undefined' && window.localStorage) {
      const cachedData = localStorage.getItem(`${this.CACHE_KEY}_${version}`);

      if (cachedData) {
        try {
          const decodedString = decodeURIComponent(atob(cachedData));
          const cache = JSON.parse(decodedString);
          
          if (cache.date === today && cache.verse) {
            return of(cache.verse);
          }
        } catch (error) {
          console.warn('Error reading Bible verse cache:', error);
          localStorage.removeItem(`${this.CACHE_KEY}_${version}`);
        }
      }
    }

    const url = `${this.baseUrl}?format=json&version=${version}`;
    return this.http.jsonp(url, 'callback').pipe(
      map((data: any) => {
        const verse = data.votd;
        if (typeof window !== 'undefined' && window.localStorage) {
          const cacheData = JSON.stringify({ date: today, verse });
          const encodedData = btoa(encodeURIComponent(cacheData));
          localStorage.setItem(`${this.CACHE_KEY}_${version}`, encodedData);
        }
        return verse;
      })
    );
  }
}
