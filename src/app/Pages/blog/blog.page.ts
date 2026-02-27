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
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    RouterLink,
    PageHeroComponent,
    AdvertiseBannerComponent,
  ],
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
      image: 'images/blog-prayer.png',
      author: 'Andrés Pérez',
    },
    {
      id: '2',
      title: 'BLOG_PAGE.ITEMS.ITEM_2.TITLE',
      category: 'BLOG_PAGE.ITEMS.ITEM_2.CATEGORY',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_2.EXCERPT',
      image: 'images/blog-community.png',
      author: 'María García',
    },
    {
      id: '3',
      title: 'BLOG_PAGE.ITEMS.ITEM_3.TITLE',
      category: 'BLOG_PAGE.ITEMS.ITEM_3.CATEGORY',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_3.EXCERPT',
      image: 'images/blog-music.png',
      author: 'Juan Rodríguez',
    },
  ]);
}
