import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly serviceId = (import.meta as any).env.NG_APP__EMAILJS_SERVICE_ID;
  private readonly publicKey = (import.meta as any).env.NG_APP__EMAILJS_PUBLIC_KEY;
  private readonly prayerTemplateId = (import.meta as any).env.NG_APP__EMAILJS_PRAYER_TEMPLATE_ID;
  private readonly contactTemplateId = (import.meta as any).env.NG_APP__EMAILJS_CONTACT_TEMPLATE_ID;

  constructor() {
    emailjs.init(this.publicKey);
  }

  sendPrayerRequest(data: { name: string; request: string }): Promise<EmailJSResponseStatus> {
    const templateParams = {
      from_name: data.name || 'Anónimo',
      message: data.request,
      request_type: 'Petición de Oración',
    };

    return emailjs.send(this.serviceId, this.prayerTemplateId, templateParams);
  }

  sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<EmailJSResponseStatus> {
    const templateParams = {
      from_name: data.name,
      reply_to: data.email,
      subject: data.subject,
      message: data.message,
    };

    return emailjs.send(this.serviceId, this.contactTemplateId, templateParams);
  }
}
