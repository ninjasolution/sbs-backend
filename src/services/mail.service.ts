import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { ReportReviewTemplate } from '../emailTemplate/reportReviewTemplate';
import { ReportContactUsTemplate } from '../emailTemplate/reportContactUsTemplate';
import { VerifyAccountTemplate } from '../emailTemplate/verifyAccountTemplate';
import { RecoveryPasswordTemplate } from '../emailTemplate/recoveryPasswordTemplate';

@Injectable()
export class EmailService  {
  private mailService: MailService;
  constructor() {
    this.mailService = new MailService();
    this.mailService.setApiKey(process.env.SEND_GRID_API_KEY);
  }

  async verifyAccount(data: any): Promise<any>  {
      const obj = new VerifyAccountTemplate(data);

      const from = `${process.env.SEMD_GRID_COMPANY_MAIL}`;

      //convert the email and password to base64 format
      const message: any = {
        from,
        to: `${data.user.email}`,
        subject: `Verify Account - SBS`,
        html: obj.getHtmlTemplate(),
      };

      const status = await this.mailService.send(message).then(res => {
        console.log('^-^Success : ', data.user.email);
        return 'success';
      }).catch(err => {
        console.log('^-^Error : ', err);
        return 'failed';
      })

      return status;

  }

  async recoveryPassword(data: any): Promise<any> {
      const obj = new RecoveryPasswordTemplate(data);

      const from = `${process.env.SEMD_GRID_COMPANY_MAIL}`;

      const message: any = {
        from,
        to: `${data.recovery.email}`,
        subject: `Account Recovery - SBS`,
        html: obj.getHtmlTemplate(),
      };

      const status = await this.mailService.send(message).then(res => {
        console.log('^-^Success : ', res);
        return 'success';
      }).catch(err => {
        console.log('^-^Error : ', err);
        return 'failed';
      })

      return status;

  }

  async reportReview(data: any): Promise<any> {

      const obj = new ReportReviewTemplate(data);

      const from = `${data.user.email}`;

      const message: any = {
        from,
        to: `${process.env.SEMD_GRID_COMPANY_MAIL}`,
        subject: `${data.report.userName} has reported a review on ${data.storeName}`,
        html: obj.getHtmlTemplate(),
      };

      const status = await this.mailService.send(message).then(res => {
        console.log('^-^Success : ', res);
        return 'success';
      }).catch(err => {
        console.log('^-^Error : ', err);
        return 'failed';
      })

      return status;

  }

  async reportContactUs(data: any) {

    const obj = new ReportContactUsTemplate(data);

      const from = `${process.env.SEMD_GRID_COMPANY_MAIL}`;

      const message: any = {
        from,
        to: `${data.recipientMail}`,
        subject: `${data.firstName} ${data.lastName} has submitted a contact form on the ${data.appName} APP from: ${data.websiteUrl}`,
        html: obj.getHtmlTemplate(),
      };

      const status = await this.mailService.send(message).then(res => {
        console.log('^-^Success : ', res);
        return 'success';
      }).catch(err => {
        console.log('^-^Error : ', err);
        return 'failed';
      })

      return status;
    }

}