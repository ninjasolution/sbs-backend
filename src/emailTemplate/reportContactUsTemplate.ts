/**
 * The ReportContactUsTemplate class describes the email template that is used when populating an "User Has Reported a Review" email.
 * 
 */
export class ReportContactUsTemplate {
    html: String = "";
    consumer_uri = process.env.CONSUMER_URI;
    
    constructor(data: any) { 
     this.html = `<head>
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>

            <table align="center" style="border: none; border-collapse: collapse; margin: auto; display: block; width: 600px; table-layout: auto;">
                <tbody>
                    <tr>
                        <th>
                            <img src="https://sbs-form-frontend.vercel.app/logo.svg" style="margin: auto; display: block; width: 600px;">
                        </th>
                    </tr>
                    <tr>
                        <th style="padding-top: 40px;">
                            <span style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 25px; color: #186d35; font-weight: bold;">${data.firstName} ${data.lastName} has submitted a contact form on the ${data.appName} APP from: ${data.websiteUrl}</span>
                        </th>
                    </tr>
                    <tr>
                        <th style="padding-top: 5px;">
                            <span style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 21px; color: #186d35; font-weight: lighter;">Details are below.</span>
                        </th>
                    </tr>
                    <tr>
                        <td style="padding-top: 40px; padding-bottom: 40px;">
                            <table border="0" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                    <td style="padding-right: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Customer Name:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.firstName} ${data.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Email:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500; padding-bottom: 35px;">Message:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; padding-bottom: 35px; vertical-align: bottom;">${data.content}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th style="padding-top: 35px;">
                            <span style="padding-top: 15px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 15px; color: #186d35; font-weight: lighter;">Something wrong with this email? Let us know at support@sbs.au and we will get right on it.</span>
                        </th>
                    </tr>
                    <tr >
                        <th style="padding-top: 75px;">
                            <span style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 15px; color: #186d35; font-weight: lighter;">© 2020, SBS. All rights reserved.</span>
                        </th>
                    </tr>
                </tbody>
            </table>
            </body>`; 
    }
    
    getHtmlTemplate(){
        return this.html;
    }
}