import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="flex flex-col" [class.items-center]="centered()" [class.text-center]="centered()">
      <div
        class="flex items-center gap-3"
        [class.mb-4]="size() === 'large'"
        [class.mb-3]="size() === 'medium'"
        [class.mb-2]="size() === 'small'"
      >
        <span class="w-12 h-1 bg-brand-secondary rounded-full"></span>
        <h2
          [id]="id() ? id() + '-title' : null"
          class="text-brand-primary/60 font-bold tracking-[0.3em] uppercase"
          [class.text-sm]="size() === 'large'"
          [class.text-xs]="size() === 'medium'"
          [class.text-xs]="size() === 'small'"
        >
          {{ title() }}
        </h2>
      </div>
      <h3
        [id]="id() ? id() + '-subtitle' : null"
        class="font-extrabold text-brand-primary tracking-tight"
        [class.text-4xl]="size() === 'large'"
        [class.md:text-6xl]="size() === 'large'"
        [class.text-3xl]="size() === 'medium'"
        [class.md:text-5xl]="size() === 'medium'"
        [class.text-2xl]="size() === 'small'"
        [class.md:text-4xl]="size() === 'small'"
        [class.mb-6]="!centered()"
        [class.mb-0]="centered()"
        [innerHTML]="subtitle()"
      ></h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  centered = input<boolean>(false);
  id = input<string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
}
