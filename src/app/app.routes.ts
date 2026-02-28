import { Routes } from '@angular/router';
import { HomePage } from './Pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'about',
    loadComponent: () => import('./Pages/about/about.page').then(m => m.AboutPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./Pages/contact/contact.page').then(m => m.ContactPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./Pages/blog/blog.page').then(m => m.BlogPage),
  },
  {
    path: 'blog/category/:category',
    loadComponent: () => import('./Pages/blog/blog.page').then(m => m.BlogPage),
  },
  {
    path: 'blog/:category/:id',
    loadComponent: () => import('./Pages/item-detail/item-detail.page').then(m => m.ItemDetailPage),
    data: { type: 'blog' },
  },
  {
    path: 'terms',
    loadComponent: () => import('./Pages/terms/terms.page').then(m => m.TermsPage),
  },
  {
    path: 'news',
    loadComponent: () => import('./Pages/news/news.page').then(m => m.NewsPage),
  },
  {
    path: 'news/category/:category',
    loadComponent: () => import('./Pages/news/news.page').then(m => m.NewsPage),
  },
  {
    path: 'news/:category/:id',
    loadComponent: () => import('./Pages/item-detail/item-detail.page').then(m => m.ItemDetailPage),
    data: { type: 'news' },
  },
  {
    path: 'schedule',
    loadComponent: () => import('./Pages/schedule/schedule.page').then(m => m.SchedulePage),
  },
  {
    path: 'studies',
    loadComponent: () => import('./Pages/studies/studies.page').then(m => m.StudiesPage),
  },
  {
    path: 'studies/category/:category',
    loadComponent: () => import('./Pages/studies/studies.page').then(m => m.StudiesPage),
  },
  {
    path: 'studies/:category/:id',
    loadComponent: () => import('./Pages/item-detail/item-detail.page').then(m => m.ItemDetailPage),
    data: { type: 'studies' },
  },
  {
    path: 'privacy',
    loadComponent: () => import('./Pages/privacy/privacy.page').then(m => m.PrivacyPage),
  },
  {
    path: ':type/:id',
    loadComponent: () => import('./Pages/item-detail/item-detail.page').then(m => m.ItemDetailPage),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./Pages/not-found/not-found.page').then(m => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
