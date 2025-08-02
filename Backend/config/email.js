const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // you can use others like SMTP
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
}

module.exports = sendEmail;
