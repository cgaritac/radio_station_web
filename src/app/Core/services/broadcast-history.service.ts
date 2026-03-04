import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of, catchError, shareReplay } from 'rxjs';

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

  private readonly CACHE_KEY = 'broadcast_history_cache';
  private readonly CACHE_TTL = 120000; // 2 minutes in ms

  private history$: Observable<BroadcastHistoryEntry[]> | null = null;

  getBroadcastHistory(): Observable<BroadcastHistoryEntry[]> {
    if (this.history$) {
      return this.history$;
    }

    // 1. Check cache
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const cached = sessionStorage.getItem(this.CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(decodeURIComponent(atob(cached)));
          if (Date.now() - timestamp < this.CACHE_TTL) {
            return of(data);
          }
        } catch (e) {
          sessionStorage.removeItem(this.CACHE_KEY);
        }
      }
    }

    const rawUrl = (import.meta as any).env.NG_APP_HISTORY_URL;
    if (!rawUrl) {
      console.warn('Broadcast history API URL is missing.');
      return of([]);
    }

    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set('rnd', Math.random().toString());

    const currentUrl = urlObj.toString();
    const fetchHistory = (url: string) => {
      const proxy = this.proxyUrl;
      const targetUrl = proxy ? `${proxy}${encodeURIComponent(url)}` : url;

      return this.http.get(targetUrl, { responseType: 'text' }).pipe(
        map((response) => {
          try {
            const parsed = JSON.parse(response);
            const data = parsed.contents ? JSON.parse(parsed.contents) : parsed;
            return (data.playlist as BroadcastHistoryEntry[]) || [];
          } catch (e) {
            console.error('Error parsing history JSON:', e);
            return [];
          }
        }),
        catchError((err) => {
          console.error(`Error loading history from proxy for ${url}:`, err);
          return of([]);
        }),
      );
    };

    this.history$ = fetchHistory(currentUrl).pipe(
      switchMap((playlist) => {
        if (playlist.length === 0) {
          const yesterdayUrl = currentUrl.replace('/playlist/?', '/playlist/1/?');
          return fetchHistory(yesterdayUrl);
        }
        return of(playlist);
      }),
      map((playlist) => {
        // 2. Save in cache if success
        if (playlist.length > 0 && typeof window !== 'undefined' && window.sessionStorage) {
          const cacheData = btoa(
            encodeURIComponent(
              JSON.stringify({
                data: playlist,
                timestamp: Date.now(),
              }),
            ),
          );
          sessionStorage.setItem(this.CACHE_KEY, cacheData);
        }
        return playlist;
      }),
      shareReplay(1),
      catchError((err) => {
        this.history$ = null;
        throw err;
      }),
    );

    setTimeout(() => (this.history$ = null), this.CACHE_TTL);

    return this.history$;
  }
}
