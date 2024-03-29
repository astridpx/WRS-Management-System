import nodemailer from "nodemailer";

const SignUpMessageMailer = async function (email: any, link: any) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    let EmailMessage = {
      from: "MORNING BREEZE <no-reply@example.com>",
      to: email,
      subject: "EMAIL VERIFICATION",
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #007bff;
            }
            p {
              font-size: 16px;
            }
            strong {
              color: #379EFF;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>MORNING BREEZE</h2>
            <p>Dear user,</p>
            <p>Thank you for signing up. To complete your registration, please verify your email address by  <span> <a
            href='${link}'
            >Clicking here</a
          ></span> </p>
            <p> If you did not sign up for an account, you can safely ignore this
            email.</p>
            <p>Best regards,<br>MORNING BREEZE</p>
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

export { SignUpMessageMailer };
