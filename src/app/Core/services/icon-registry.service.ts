import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly iconRegistry = inject(SvgIconRegistryService);

  private icons = [
    { name: 'play', path: 'icons/play.svg' },
    { name: 'pause', path: 'icons/pause.svg' },
    { name: 'volume', path: 'icons/volume.svg' },
    { name: 'mute', path: 'icons/mute.svg' },
    { name: 'clock', path: 'icons/clock.svg' },
    { name: 'person', path: 'icons/person.svg' },
    { name: 'radio', path: 'icons/radio.svg' },
    { name: 'stop', path: 'icons/stop.svg' },
    { name: 'facebook', path: 'icons/facebook.svg' },
    { name: 'instagram', path: 'icons/instagram.svg' },
    { name: 'youtube', path: 'icons/youtube.svg' },
    { name: 'spotify', path: 'icons/spotify.svg' },
    { name: 'tiktok', path: 'icons/tiktok.svg' },
    { name: 'whatsapp', path: 'icons/whatsapp.svg' },
    { name: 'microphone', path: 'icons/microphone.svg' },
    { name: 'downArrow', path: 'icons/downArrow.svg' },
    { name: 'location', path: 'icons/location.svg' },
    { name: 'mail', path: 'icons/mail.svg' },
    { name: 'phone', path: 'icons/phone.svg' },
    { name: 'speaker', path: 'icons/speaker.svg' },
    { name: 'info', path: 'icons/info.svg' },
    { name: 'link', path: 'icons/link.svg' },
  ];

  preloadIcons(): void {
    this.icons.forEach(icon => {
      this.iconRegistry.loadSvg(icon.path, icon.name)?.subscribe();
    });
  }
}
