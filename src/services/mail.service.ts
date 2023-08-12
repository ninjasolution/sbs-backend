import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');
import { ReportReviewTemplate } from '../emailTemplate/reportReviewTemplate';
import { ReportContactUsTemplate } from '../emailTemplate/reportContactUsTemplate';
import { VerifyAccountTemplate } from '../emailTemplate/verifyAccountTemplate';
import { RecoveryPasswordTemplate } from '../emailTemplate/recoveryPasswordTemplate';

@Injectable()
export class MailService {
  constructor() {}

  async verifyAccount(data: any) {
    return new Promise((resolve, reject) => {
      const obj = new VerifyAccountTemplate(data);

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `${data.user.email}`,
        subject: `Verify Account - CannaBoss`,
        html: obj.getHtmlTemplate(),
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log('^-^', message.headers);
          console.log('AWS_SES_ACCESS_KEY: ', process.env.AWS_SES_ACCESS_KEY);
          console.log(
            'AWS_SES_SECRET_ACCESS_KEY: ',
            process.env.AWS_SES_SECRET_ACCESS_KEY,
          );
          console.log('AWS_SES_USER: ', process.env.AWS_SES_USER);
          console.log('ERROR:', error);
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }

  async recoveryPassword(data: any) {
    return new Promise((resolve, reject) => {
      const obj = new RecoveryPasswordTemplate(data);

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `${data.recovery.email}`,
        subject: `Account Recovery - CannaBoss`,
        html: obj.getHtmlTemplate(),
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }

  async reportReview(data: any) {
    return new Promise((resolve, reject) => {
      const obj = new ReportReviewTemplate(data);

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `${process.env.AWS_SES_USER}`,
        subject: `${data.report.userName} has reported a review on ${data.storeName}`,
        html: obj.getHtmlTemplate(),
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }

  async reportContactUs(data: any) {
    return new Promise((resolve, reject) => {
      const obj = new ReportContactUsTemplate(data);

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `${data.recipientMail}`,
        subject: `${data.firstName} ${data.lastName} has submitted a contact form on the ${data.appName} APP from: ${data.websiteUrl}`,
        html: obj.getHtmlTemplate(),
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log('^-^', message.headers);
          console.log('AWS_SES_ACCESS_KEY: ', process.env.AWS_SES_ACCESS_KEY);
          console.log(
            'AWS_SES_SECRET_ACCESS_KEY: ',
            process.env.AWS_SES_SECRET_ACCESS_KEY,
          );
          console.log('AWS_SES_USER: ', process.env.AWS_SES_USER);
          console.log('ERROR:', error);
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }

  async testingWoo(test: any) {
    return new Promise((resolve, reject) => {
      console.log('...::::');
      resolve('eteleyo');
    });
  }

  async reportWoocommerceError(error: any, endpoint: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //const obj = new ReportReviewTemplate(data);
      let htmlError = `<div><p>Endpoint : ${endpoint} </p></div>
                             <div><p>Message : ${error.message} </p></div>
                             <div><p>Error : ${error.stack} </p></div>
                             <div><p>Url : ${
                               error.config ? error.config.url : ''
                             } </p></div>
            `;

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `jordan.blazevich@cannaboss.ca`,
        subject: `Woocommerce has reported a review on`,
        html: htmlError,
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }

  async reportWoocommerceOperation(product: any, endpoint: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //const obj = new ReportReviewTemplate(data);
      let htmlError = `<p>${product} </p>End:<p>${endpoint}</p>`;

      const transporter = nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.AWS_SES_ACCESS_KEY,
          pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
        },
      });

      const from = `${process.env.AWS_SES_USER}`;

      //convert the email and password to base64 format
      let authInfo = Buffer.from(
        `${transporter.options.auth.user}:${transporter.options.auth.pass}`,
        'utf8',
      ).toString('base64');

      const message = {
        from,
        to: `jordan.blazevich@cannaboss.ca`,
        subject: `Woocommerce has reported a review on`,
        html: htmlError,
        replyTo: from,
        headers: {
          Authorization: `Basic ${authInfo}`,
        },
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          resolve('failure');
        }

        return resolve('success');
      });
    });
  }
}
