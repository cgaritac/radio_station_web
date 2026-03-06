import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from '~/app/Shared/components/action-button/action-button.component';
import { EmailService } from '~/app/Core/services/email.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ActionButtonComponent],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);

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
