const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

async function sendEmail(options) {
  // Read the email template file
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, "emailTemplate.html"),
    "utf-8"
  );

  // Compile the template
  const template = handlebars.compile(emailTemplate);

  // Generate the HTML content using the template and user data
  const userData = {
    name: options.name,
    email: options.email,
  };
  const htmlContent = template(userData);

  // Create a transporter using your Gmail account credentials
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // Sender address
      to: options.email, // Recipient address
      subject: options.subject, // Subject line
      html: htmlContent,
    });

    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Error occurred while sending email:", error);
  }
}

module.exports = sendEmail;
