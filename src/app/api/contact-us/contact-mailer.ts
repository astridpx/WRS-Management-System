import nodemailer from "nodemailer";

const ContactUsMessageMailer = async function (
  email: any,
  name: any,
  message: any
) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    let EmailMessage = {
      from: email,
      to: process.env.EMAIL,
      subject: "Inquiry from Website Contact Form",
      html: `
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morning Breeze Inquiry</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        color: #3498db;
      }
  
      .highlight {
        color: #3498db;
      }
  
      p {
        margin-bottom: 10px;
      }
    </style>
  </head>
      <body>
        <div class="container">
          <h2>MORNING BREEZE</h2>
          <p>Dear Morning Breeze,</p>
          <p>I hope this email finds you well. My name is <strong>${name}</strong>, and I recently visited your website. I am reaching out to you through the Contact Us page as I have a question/comment that I would appreciate your assistance with</p>

          <p>Here are my details:</p>
          <p><strong class="highlight">Name:</strong> ${name}</p>
          <p><strong class="highlight">Email:</strong> ${email}</p>

          <p class="highlight"><strong>Message:</strong></p>
          <p><i>"${message}"</i></p>
          <p>Thank you for your time and assistance. I look forward to hearing from you soon.</p>

          <p>Best regards,</p>
          <p><strong>${name}</strong></p>
        </div>
      </body>
    </html>`,
    };

    transporter.sendMail(EmailMessage, (err) => {
      if (err) {
        console.log(err);
        reject(err); // Reject the promise with the error
      } else {
        console.log(`Email successfully sent to ${email}.`);
        resolve(true); // Resolve the promise with a success indicator
      }
    });
  });
};

export { ContactUsMessageMailer };
