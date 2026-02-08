import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  private readonly streamUrl = (import.meta as any).env.NG_APP_STREAM_URL;
  private audio: HTMLAudioElement | null = null;
  
  readonly isPlaying = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio(this.streamUrl);
      this.audio.preload = 'none';
      
      this.audio.onplay = () => this.isPlaying.set(true);
      this.audio.onpause = () => this.isPlaying.set(false);
      this.audio.onerror = () => {
        console.error('Error en el stream de audio');
        this.reset();
      };
    }
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.isPlaying()) {
      this.audio.pause();
      this.reset();
    } else {
      this.audio.play().catch(err => console.error('Error al reproducir:', err));
    }
  }

  private reset(): void {
    if (!this.audio) return;
    this.audio.src = '';
    this.audio.load();
    this.audio.src = this.streamUrl;
    this.isPlaying.set(false);
  }
}
