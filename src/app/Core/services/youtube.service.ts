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
      const channel = this.channelId;
      const proxy = this.proxyUrl;
      const feeds = this.feedsBaseUrl;

      if (!channel || !proxy || !feeds) {
        console.warn('YouTube configuration missing in environment variables');
        return null;
      }

      const rssUrl = `${feeds}${channel}`;
      const targetUrl = `${proxy}${encodeURIComponent(rssUrl)}`;

      const rawResponse = await lastValueFrom(this.http.get(targetUrl, { responseType: 'text' }));

      let xmlString = rawResponse;
      if (rawResponse.trim().startsWith('{')) {
        try {
          const json = JSON.parse(rawResponse);
          if (json.contents) {
            xmlString = json.contents;
          }
        } catch (e) {
          // Is not a valid JSON, treat as XML direct
        }
      }

      let xmlDoc: Document;
      try {
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      } catch (e) {
        console.error('Error parsing XML response from YouTube feed:', e);
        return null;
      }

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

      return null;
    } catch (error) {
      console.error('Error fetching latest YouTube video:', error);
      return null;
    }
  }
}
