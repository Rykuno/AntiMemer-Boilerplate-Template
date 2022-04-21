import { Injectable } from '@nestjs/common';
import * as sendgridClient from '@sendgrid/client';
import * as sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

interface TemplateVersion {
  updated_at: string;
  html_content: string;
  plain_content: string;
  subject: string;
}

interface MailArgs {
  templateId: string;
  to: string[] | string;
  variables?: any;
}

@Injectable()
export class MailerService {
  private readonly from: string = 'noreply@poptaro.com';

  async send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
      templateId: args.templateId,
      dynamic_template_data: args.variables,
    };
    try {
      await sendgrid.send(data);
    } catch (err) {
      console.log('Error sending mail:', err);
    }
  }
}
