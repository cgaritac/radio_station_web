import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '~/app/Shared/components/action-button/action-button.component';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';

export interface ModalDetail {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    ActionButtonComponent,
    SectionHeaderComponent,
  ],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      (click)="close.emit()"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-brand-primary/40 backdrop-blur-xl animate-fade-in"></div>

      <!-- Modal Content -->
      <div
        class="relative bg-brand-tertiary w-full max-w-4xl rounded-4xl overflow-hidden shadow-2xl shadow-brand-primary/20 animate-scale-in"
        (click)="$event.stopPropagation()"
      >
        <!-- Close Button -->
        <button
          (click)="close.emit()"
          class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-brand-tertiary/20 hover:bg-white/40 backdrop-blur-md rounded-full text-brand-primary transition-all cursor-pointer"
        >
          <svg-icon name="close" class="w-5 h-5"></svg-icon>
        </button>

        <div class="flex flex-col md:flex-row h-full">
          <!-- Image Section -->
          <div class="md:w-5/12 aspect-square md:aspect-auto relative group">
            <img [src]="image()" [alt]="title()" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-brand-primary/40 to-transparent"></div>
          </div>

          <!-- Info Section -->
          <div class="md:w-7/12 p-8 md:p-10 flex flex-col">
            <app-section-header
              [title]="category()"
              [subtitle]="title()"
              [centered]="true"
              size="small"
              class="mb-4"
            ></app-section-header>

            <!-- Details -->
            @if (details().length > 0) {
              <div class="space-y-3 mb-8">
                @for (detail of details(); track $index) {
                  <div class="flex items-start gap-3 text-brand-primary/60">
                    <div class="bg-brand-secondary/10 rounded-lg text-brand-secondary">
                      <svg-icon [name]="detail.icon" class="w-4 h-4"></svg-icon>
                    </div>
                    <span class="text-sm font-semibold leading-relaxed">{{ detail.text }}</span>
                  </div>
                }
              </div>
            }

            <!-- Description -->
            <p class="text-brand-primary/70 leading-relaxed mb-10 grow">
              {{ description() }}
            </p>

            <!-- Actions -->
            <div class="mt-auto">
              <app-action-button
                [text]="actionText()"
                [link]="actionLink()"
                color="secondary"
                size="large"
                class="w-full"
                style="display: block"
                [icon]="actionIcon()"
              >
              </app-action-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailModalComponent {
  image = input.required<string>();
  title = input.required<string>();
  category = input<string>('');
  description = input.required<string>();
  details = input<ModalDetail[]>([]);
  actionText = input<string>('');
  actionLink = input<string>('');
  actionIcon = input<string>('');

  close = output<void>();
}
