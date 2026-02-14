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
    { name: 'youtube', path: 'icons/youtube.svg' }
  ];

  preloadIcons(): void {
    this.icons.forEach(icon => {
      this.iconRegistry.loadSvg(icon.path, icon.name)?.subscribe();
    });
  }
}
