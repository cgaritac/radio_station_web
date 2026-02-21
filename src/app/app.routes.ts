import { Routes } from '@angular/router';
import { HomePage } from './Pages/home/home.page';
import { AboutPage } from './Pages/about/about.page';
import { BlogPage } from './Pages/blog/blog.page';
import { TermsPage } from './Pages/terms/terms.page';
import { NewsPage } from './Pages/news/news.page';
import { SchedulePage } from './Pages/schedule/schedule.page';
import { StudiesPage } from './Pages/studies/studies.page';
import { ContactPage } from './Pages/contact/contact.page';
import { PrivacyPage } from './Pages/privacy/privacy.page';
import { NotFoundPage } from './Pages/not-found/not-found.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'about',
    component: AboutPage,
  },
  {
    path: 'contact',
    component: ContactPage,
  },
  {
    path: 'blog',
    component: BlogPage,
  },
  {
    path: 'terms',
    component: TermsPage,
  },
  {
    path: 'news',
    component: NewsPage,
  },
  {
    path: 'schedule',
    component: SchedulePage,
  },
  {
    path: 'studies',
    component: StudiesPage,
  },
  {
    path: 'privacy',
    component: PrivacyPage,
  },
  {
    path: 'not-found',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
