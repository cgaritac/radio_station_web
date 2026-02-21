import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-prayer-request',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ActionButtonComponent],
  templateUrl: './prayer-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrayerRequestComponent {
  private readonly fb = inject(FormBuilder);
  
  readonly prayerForm: FormGroup = this.fb.group({
    name: [''],
    request: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly isSubmitting = signal(false);
  readonly showSuccess = signal(false);
  readonly showError = signal(false);

  onSubmit() {
    if (this.prayerForm.invalid) {
      this.prayerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);

    const { name, request } = this.prayerForm.value;
    const body = `Nombre: ${name || 'Anónimo'}\n\nPetición:\n${request}`;
    const mailtoLink = `mailto:info@XXXXX.com?subject=Solicitud de oración&body=${encodeURIComponent(body)}`;

    // Simulate sending or trigger mailto
    setTimeout(() => {
      window.location.href = mailtoLink;
      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      this.prayerForm.reset();
    }, 1000);
  }
}
