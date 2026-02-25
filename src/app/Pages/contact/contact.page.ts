import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from '../../Features/contact-form/contact-form.component';
import { ContactInfoComponent } from '../../Shared/components/contact-info/contact-info.component';
import { SocialLinksComponent } from '../../Shared/components/social-links/social-links.component';
import { LocationMapComponent } from '../../Shared/components/location-map/location-map.component';
import { PageHeroComponent } from '../../Shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ContactFormComponent,
    ContactInfoComponent,
    SocialLinksComponent,
    LocationMapComponent,
    PageHeroComponent,
  ],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {}
