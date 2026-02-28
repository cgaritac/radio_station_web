import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of, catchError } from 'rxjs';

export interface BroadcastHistoryEntry {
  id: string;
  name: string;
  created: number;
}

export interface BroadcastHistoryResponse {
  playlist: BroadcastHistoryEntry[];
  currentTrackId: string;
  ampm: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BroadcastHistoryService {
  private readonly http = inject(HttpClient);
  private get proxyUrl() {
    return (import.meta as any).env.NG_APP_CORS_PROXY_URL || '';
  }

  getBroadcastHistory(): Observable<BroadcastHistoryEntry[]> {
    const rawUrl = (import.meta as any).env.NG_APP_HISTORY_URL;
    if (!rawUrl) {
      console.warn('Broadcast history API URL is missing.');
      return of([]);
    }

    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set('rnd', Math.random().toString());

    const currentUrl = urlObj.toString();
    const fetchHistory = (url: string) => {
      const targetUrl = this.proxyUrl ? `${this.proxyUrl}${url}` : url;
      return this.http.get<any>(targetUrl).pipe(
        map((response) => {
          let data = response;
          if (response && response.contents) {
            try {
              data = JSON.parse(response.contents);
            } catch (e) {
              console.error('Error parsing proxy contents:', e);
            }
          }
          return (data.playlist as BroadcastHistoryEntry[]) || [];
        }),
        catchError((err) => {
          console.error(`Error loading history from ${url}:`, err);
          return of([]);
        }),
      );
    };

    return fetchHistory(currentUrl).pipe(
      switchMap((playlist) => {
        if (playlist.length === 0) {
          const yesterdayUrl = currentUrl.replace('/playlist/', '/playlist/1/');
          return fetchHistory(yesterdayUrl);
        }
        return of(playlist);
      }),
    );
  }
}
