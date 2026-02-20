import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ScheduleEntry {
  id: string;
  name: string;
  created: number;
}

export interface ScheduleResponse {
  playlist: ScheduleEntry[];
  currentTrackId: string;
  ampm: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = (import.meta as any).env.NG_APP_HISTORY_URL;

  getSchedule(): Observable<ScheduleEntry[]> {
    const randomUrl = `${this.apiUrl}&rnd=${Math.random()}`; // Random parameter to avoid caching
    return this.http.get<ScheduleResponse>(randomUrl).pipe(map((response) => response.playlist));
  }
}
