import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of } from 'rxjs';

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
  private readonly apiUrl = (import.meta as any).env.NG_APP_HISTORY_URL;

  getBroadcastHistory(): Observable<BroadcastHistoryEntry[]> {
    const randomUrl = `${this.apiUrl}&rnd=${Math.random()}`; // Random parameter to avoid caching
    return this.http.get<BroadcastHistoryResponse>(randomUrl).pipe(
      switchMap((response) => {
        const playlist = response.playlist || [];
        if (playlist.length < 5) {
          const prevUrl = randomUrl.replace('/playlist/', '/playlist/1');
          return this.http.get<BroadcastHistoryResponse>(prevUrl).pipe(
            map((prevResponse) => {
              const prevPlaylist = prevResponse.playlist || [];
              const combined = [...playlist];
              prevPlaylist.forEach((item) => {
                if (!combined.some((c) => c.name === item.name && c.created === item.created)) {
                  combined.push(item);
                }
              });
              return combined;
            }),
          );
        }
        return of(playlist);
      }),
    );
  }
}
