import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { EmailService } from '../../Core/services/email.service';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SvgIconComponent,
    ActionButtonComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);
  protected readonly radioService = inject(RadioService);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly isSubmitting = signal(false);
  readonly showSuccess = signal(false);
  readonly showError = signal(false);

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);

    try {
      await this.emailService.sendContactMessage(this.contactForm.value);
      this.showSuccess.set(true);
      this.contactForm.reset();
    } catch (error: any) {
      console.error('Error sending contact message:', error);
      this.showError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
