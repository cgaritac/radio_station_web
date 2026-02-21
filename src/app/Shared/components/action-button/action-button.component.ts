
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    @if (link) {
      <a
        [href]="link"
        target="_blank"
        rel="noopener noreferrer"
        [class]="buttonClasses"
        [ngClass]="variantClasses"
        [title]="tooltipText"
      >
        @if (icon) {
          <svg-icon [name]="icon" [applyClass]="true" [class]="iconSizeClass"></svg-icon>
        }
        
        <ng-content></ng-content>
        {{ text || label }}
      </a>
    } @else {
      <button
        [type]="type"
        [class]="buttonClasses"
        [ngClass]="variantClasses"
        [title]="tooltipText"
        [disabled]="disabled"
      >
        @if (icon) {
          <svg-icon [name]="icon" [applyClass]="true" [class]="iconSizeClass"></svg-icon>
        }
        
        @if (showPulse) {
          <span class="w-2 h-2 rounded-full animate-pulse bg-current"></span>
        }
        
        <ng-content></ng-content>
        {{ text || label }}
      </button>
    }
  `,
  styles: [`
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
  `]
})
export class ActionButtonComponent {
  @Input() text: string = '';
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() icon: string = '';
  @Input() link: string = '';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'tertiary' | 'quaternary' | 'quinary' | 'sextary' | 'transparent_dark' | 'transparent_light' = 'secondary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showPulse: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() bgColor: string = '';
  @Input() textColor: string = '';

  get tooltipText(): string {
    return this.tooltip || this.text || this.label;
  }

  get buttonClasses(): string {
    const base = "tracking-wide rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:opacity-90";
    
    const sizeClasses = {
      small: "px-4 py-1.5 text-sm min-w-32",
      medium: "px-6 py-2 min-w-36",
      large: "px-8 py-3 text-lg min-w-52"
    };

    return `${base} ${sizeClasses[this.size]}`;
  }

  get variantClasses(): string[] {
    if (this.bgColor || this.textColor) {
      return [this.bgColor, this.textColor];
    }

    switch (this.color) {
      case 'primary':
        return ['bg-brand-primary', 'text-brand-tertiary'];
      case 'secondary':
        return ['bg-brand-secondary', 'text-brand-primary'];
      case 'tertiary':
        return ['bg-brand-tertiary', 'text-brand-primary'];
      case 'accent':
        return ['bg-brand-quaternary', 'text-brand-primary'];
      case 'quaternary':
        return ['bg-brand-quaternary', 'text-brand-primary'];
      case 'quinary':
        return ['bg-brand-quinary', 'text-brand-tertiary'];
      case 'sextary':
        return ['bg-brand-sextary', 'text-brand-primary'];
      case 'transparent_dark':
        return ['bg-transparent', 'text-brand-primary'];
      case 'transparent_light':
        return ['bg-transparent', 'text-brand-tertiary'];
      default:
        return ['bg-brand-secondary', 'text-brand-primary'];
    }
  }

  get iconSizeClass(): string {
    switch (this.size) {
      case 'small': return 'w-4 h-4';
      case 'large': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  }
}

