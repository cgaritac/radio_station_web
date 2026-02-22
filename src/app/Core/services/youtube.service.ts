import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface YouTubeVideoInfo {
  title: string;
  thumbnail: string;
  videoId: string;
}

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  private readonly http = inject(HttpClient);

  // Strict environment variables usage
  private get channelId() {
    return (import.meta as any).env.NG_APP_YOUTUBE_CHANNEL_ID;
  }

  private get proxyUrl() {
    return (import.meta as any).env.NG_APP_CORS_PROXY_URL;
  }

  private get thumbnailBaseUrl() {
    return (import.meta as any).env.NG_APP_YOUTUBE_THUMBNAIL_URL;
  }

  private get feedsBaseUrl() {
    return (import.meta as any).env.NG_APP_YOUTUBE_FEEDS_URL;
  }

  async getLatestVideo(): Promise<YouTubeVideoInfo | null> {
    try {
      if (!this.channelId || !this.proxyUrl) {
        console.warn('YouTube channel ID or Proxy URL missing in environment variables');
        return null;
      }

      const rssUrl = `${this.feedsBaseUrl}${this.channelId}`;
      const response: any = await lastValueFrom(
        this.http.get(`${this.proxyUrl}${encodeURIComponent(rssUrl)}`),
      );

      if (response?.contents) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.contents, 'text/xml');
        const entries = xmlDoc.getElementsByTagName('entry');

        if (entries.length > 0) {
          const latestEntry = entries[0];
          const title = latestEntry.getElementsByTagName('title')[0]?.textContent || '';
          const videoId = latestEntry.getElementsByTagName('yt:videoId')[0]?.textContent || '';

          return {
            title: title,
            thumbnail: `${this.thumbnailBaseUrl}/${videoId}/maxresdefault.jpg`,
            videoId: videoId,
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching latest YouTube video:', error);
      return null;
    }
  }
}
