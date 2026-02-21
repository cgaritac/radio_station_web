import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = (import.meta as any).env.NG_APP_BIBLE_GATEWAY_URL;
  private readonly CACHE_KEY = 'daily_bible_verse_v2';

  getVerse(version: string): Observable<any> {
    const now = new Date();
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

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
        let verse = data?.votd;
        if (verse && verse.text) {
          verse.text = this.cleanText(verse.text);

          if (typeof window !== 'undefined' && window.localStorage) {
            const cacheData = JSON.stringify({ date: today, verse });
            const encodedData = btoa(encodeURIComponent(cacheData));
            localStorage.setItem(`${this.CACHE_KEY}_${version}`, encodedData);
          }
        }
        return verse;
      }),
    );
  }

  private cleanText(text: string): string {
    if (!text) return text;

    // 1. Remove cross-references in brackets or parentheses like (A) or [B]
    let cleaned = text.replace(/\([A-Z]\)|\[[A-Z]\]/g, '');

    // 2. Remove Scripture references embedded in text (common in RVR1960)
    cleaned = cleaned.replace(
      /\s*[A-Z][a-z]{1,3}\.?\s*\d+[\.:]\d+(?:[;,\s]+[A-Z][a-z]{1,3}\.?\s*\d+[\.:]\d+)*\.?/g,
      '',
    );

    // 3. Clean up any resulting double spaces or awkward trailing/leading punctuation
    cleaned = cleaned.replace(/\s\s+/g, ' ').trim();

    return cleaned;
  }
}
