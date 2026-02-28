import { Injectable, signal, effect, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RadioService {
  private readonly streamUrl = (import.meta as any).env.NG_APP_STREAM_URL;
  private readonly metadataUrl = (import.meta as any).env.NG_APP_METADATA_URL;
  private readonly _radioName = (import.meta as any).env.NG_APP_RADIO_NAME;
  private readonly _radioAddress = (import.meta as any).env.NG_APP_RADIO_ADDRESS;

  private audio: HTMLAudioElement | null = null;
  private eventSource: EventSource | null = null;

  readonly radioName = signal(this._radioName);
  readonly radioAddress = signal(this._radioAddress);
  readonly isPlaying = signal(false);
  readonly volume = signal(5);
  readonly isMuted = signal(false);
  readonly isIOS = signal(false);
  readonly currentTrack = signal<string>('Loading program...');

  readonly trackInfo = computed(() => {
    const track = this.currentTrack();
    const parts = track.split(/[|-]/).map((p) => p.trim());
    return {
      artist: parts[0] || '',
      title: parts[1] || '',
    };
  });

  readonly socialLinks = {
    facebook: (import.meta as any).env.NG_APP_FACEBOOK_URL,
    instagram: (import.meta as any).env.NG_APP_INSTAGRAM_URL,
    youtube: (import.meta as any).env.NG_APP_YOUTUBE_URL,
    youtubeWatch: (import.meta as any).env.NG_APP_YOUTUBE_WATCH_URL,
    spotify: (import.meta as any).env.NG_APP_SPOTIFY_URL,
    tiktok: (import.meta as any).env.NG_APP_TIKTOK_URL,
    whatsapp: (import.meta as any).env.NG_APP_WHATSAPP_URL,
    radioBox: (import.meta as any).env.NG_APP_RADIO_BOX_URL,
    googleMaps: (import.meta as any).env.NG_APP_GOOGLE_MAPS_SEARCH_URL,
    googleMapsEmbed: (import.meta as any).env.NG_APP_GOOGLE_MAPS_EMBED_URL,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.isIOS.set(/iPad|iPhone|iPod/.test(navigator.userAgent));

      this.audio = new Audio(this.streamUrl);
      this.audio.preload = 'none';
      this.audio.volume = this.volume() / 10;

      this.audio.onplay = () => this.isPlaying.set(true);
      this.audio.onpause = () => this.isPlaying.set(false);
      this.audio.onerror = () => {
        console.error('Error in the audio stream');
        this.reset();
      };

      this.connectMetadata();

      effect(() => {
        if (this.audio) {
          this.audio.volume = this.volume() / 10;
          this.audio.muted = this.isMuted();
        }
      });
    }
  }

  private connectMetadata(): void {
    if (typeof window === 'undefined') return;

    this.eventSource = new EventSource(this.metadataUrl);

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.streamTitle) {
          this.currentTrack.set(data.streamTitle);
        }
      } catch (e) {
        console.error('Error parsing metadata', e);
      }
    };

    this.eventSource.onerror = () => {
      console.warn('Reconnecting metadata...');
      this.eventSource?.close();
      setTimeout(() => this.connectMetadata(), 5000);
    };
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.isPlaying()) {
      this.audio.pause();
      this.reset();
    } else {
      this.audio.play().catch((err) => console.error('Error al reproducir:', err));
    }
  }

  setVolume(value: number): void {
    this.volume.set(value);
    if (value > 0) {
      this.isMuted.set(false);
    }
  }

  toggleMute(): void {
    this.isMuted.update((muted) => !muted);
  }

  private reset(): void {
    if (!this.audio) return;
    this.audio.src = '';
    this.audio.load();
    this.audio.src = this.streamUrl;
    this.audio.volume = this.volume() / 10;
    this.isPlaying.set(false);
  }
}
