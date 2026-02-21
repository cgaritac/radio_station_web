import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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
    return this.http.get<BroadcastHistoryResponse>(randomUrl).pipe(map((response) => response.playlist));
  }
}
