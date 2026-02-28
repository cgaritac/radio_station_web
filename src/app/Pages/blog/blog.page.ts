import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeroComponent } from '../../Shared/components/page-hero/page-hero.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';
import { CategoryFilterComponent } from '../../Shared/components/category-filter/category-filter.component';
import { BlogListComponent } from '../../Features/blog-list/blog-list.component';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  image: string;
  author: string;
}

interface Category {
  slug: string;
  label: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PageHeroComponent,
    AdvertiseBannerComponent,
    CategoryFilterComponent,
    BlogListComponent,
  ],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPage {
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  categories = signal<Category[]>([
    { slug: 'christian-life', label: 'BLOG_PAGE.CATEGORIES.CHRISTIAN_LIFE' },
    { slug: 'bible-study', label: 'BLOG_PAGE.CATEGORIES.BIBLE_STUDY' },
    { slug: 'music', label: 'BLOG_PAGE.CATEGORIES.MUSIC' },
  ]);

  selectedCategorySlug = toSignal(
    this.route.params.pipe(map((params) => params['category'] || 'all')),
  );

  heroTitle = computed(() => {
    const categorySlug = this.selectedCategorySlug();
    if (!categorySlug || categorySlug === 'all') {
      return this.translate.instant('BLOG_PAGE.TITLE');
    }
    const category = this.categories().find((c) => c.slug === categorySlug);
    return category
      ? this.translate.instant('BLOG_PAGE.TITLE') + ': ' + this.translate.instant(category.label)
      : this.translate.instant('BLOG_PAGE.TITLE');
  });

  blogPosts = signal<BlogPost[]>([
    {
      id: '1',
      title: 'BLOG_PAGE.ITEMS.ITEM_1.TITLE',
      category: 'BLOG_PAGE.CATEGORIES.CHRISTIAN_LIFE',
      categorySlug: 'christian-life',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_1.EXCERPT',
      image: 'images/blog-prayer.png',
      author: 'Andrés Pérez',
    },
    {
      id: '2',
      title: 'BLOG_PAGE.ITEMS.ITEM_2.TITLE',
      category: 'BLOG_PAGE.CATEGORIES.BIBLE_STUDY',
      categorySlug: 'bible-study',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_2.EXCERPT',
      image: 'images/blog-community.png',
      author: 'María García',
    },
    {
      id: '3',
      title: 'BLOG_PAGE.ITEMS.ITEM_3.TITLE',
      category: 'BLOG_PAGE.CATEGORIES.MUSIC',
      categorySlug: 'music',
      excerpt: 'BLOG_PAGE.ITEMS.ITEM_3.EXCERPT',
      image: 'images/blog-music.png',
      author: 'Juan Rodríguez',
    },
  ]);

  filteredPosts = computed(() => {
    const category = this.selectedCategorySlug();
    if (!category || category === 'all') {
      return this.blogPosts();
    }
    return this.blogPosts().filter((post) => post.categorySlug === category);
  });
}
