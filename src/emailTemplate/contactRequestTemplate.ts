/**
 * The ContactRequestTemplate class describes the email template that is used when populating an "User Has Reported a Review" email.
 * 
 */
export class ContactRequestTemplate {
    html: String = "";
    consumer_uri = process.env.CONSUMER_URI;

    constructor(data: any) {
        this.html = `<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loan Request Form</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
      
          section {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 400px;
          }
      
          h2 {
            margin-bottom: 20px;
            color: #333;
          }
      
          p {
            margin-bottom: 10px;
            color: #555;
            column-width: 200px;
          }
        </style>
      </head>
      <body>
      
        <section>
          <h2>Contact request</h2>
      
          <p>Message: ${data?.message}</p>
          
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> ${data?.email}</p>
          <p><strong>First Name:</strong> ${data?.firstName}</p>
          <p><strong>Company Name:</strong> ${data?.companyName}</p>
        </section>
      
      </body>`;
    }

    getHtmlTemplate() {
        return this.html;
    }
}