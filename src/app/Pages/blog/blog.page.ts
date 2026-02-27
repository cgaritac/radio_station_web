import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { PageHeroComponent } from '../../Shared/components/page-hero/page-hero.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, RouterLink, PageHeroComponent, AdvertiseBannerComponent],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPage {
  private translate = inject(TranslateService);
  blogPosts = signal<BlogPost[]>([
    {
      id: '1',
      title: 'BLOG_PAGE.ITEMS.ITEM_1.TITLE',
      category: 'BLOG_PAGE.ITEMS.ITEM_1.CATEGORY',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_1.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1504052434467-813d1ef3933c?w=800&auto=format&fit=crop',
      author: 'Andrés Pérez',
    },
    {
      id: '2',
      title: 'BLOG_PAGE.ITEMS.ITEM_2.TITLE',
      category: 'BLOG_PAGE.ITEMS.ITEM_2.CATEGORY',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_2.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
      author: 'María García',
    },
    {
      id: '3',
      title: 'BLOG_PAGE.ITEMS.ITEM_3.TITLE',
      category: 'BLOG_PAGE.ITEMS.ITEM_3.CATEGORY',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_3.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
      author: 'Juan Rodríguez',
    },
  ]);
}
