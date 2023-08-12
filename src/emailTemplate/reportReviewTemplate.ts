/**
 * The ReportReviewTemplate class describes the email template that is used when populating an "User Has Reported a Review" email.
 * 
 */
export class ReportReviewTemplate {
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
                            <img src="https://sbsau.s3.au-central-1.amazonaws.com/email-template-header.png" style="margin: auto; display: block; width: 600px;">
                        </th>
                    </tr>
                    <tr>
                        <th style="padding-top: 40px;">
                            <span style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 25px; color: #186d35; font-weight: bold;">${data.report.userName} has reported a review on ${data.storeName}</span>
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
                                    <td style="padding-right: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Store name:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.storeName}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500; padding-bottom: 35px;">Store alias:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; padding-bottom: 35px; vertical-align: bottom;">${data.report.storeAlias}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Report ID:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.reportId}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Reporter:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.report.userName}</td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 35px; padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Reason:</td>
                                    <td style=" padding-bottom: 35px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.report.reason}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Review ID:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.reportId}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Reviewer:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.review.userName}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500;">Title:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom;">${data.review.title}</td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; font-weight: 500; vertical-align: top;">Description:</td>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; font-size: 18px; color: #186d35; vertical-align: bottom; padding-top: 8px;">${data.review.description}</td>
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