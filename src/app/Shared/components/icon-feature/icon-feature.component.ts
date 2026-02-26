import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-icon-feature',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <div class="p-8 bg-brand-primary/5 rounded-3xl border border-brand-primary/5 h-full">
      <div class="rounded-2xl flex items-center justify-start text-brand-quaternary mb-6">
        <svg-icon [name]="icon()" class="w-12 h-12"></svg-icon>
      </div>
      <h4 class="text-xl font-bold text-brand-primary mb-3">
        {{ title() }}
      </h4>
      <p class="text-sm text-brand-primary/60 leading-relaxed">
        {{ text() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFeatureComponent {
  icon = input.required<string>();
  title = input.required<string>();
  text = input.required<string>();
}
