import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { EmailService } from '../../Core/services/email.service';

@Component({
  selector: 'app-prayer-request',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ActionButtonComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './prayer-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrayerRequestComponent {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);

  readonly prayerForm: FormGroup = this.fb.group({
    name: [''],
    request: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly isSubmitting = signal(false);
  readonly showSuccess = signal(false);
  readonly showError = signal(false);

  async onSubmit() {
    if (this.prayerForm.invalid) {
      this.prayerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);

    try {
      await this.emailService.sendPrayerRequest(this.prayerForm.value);
      this.showSuccess.set(true);
      this.prayerForm.reset();
    } catch (error: any) {
      console.error('Error sending prayer request:', error);
      this.showError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
