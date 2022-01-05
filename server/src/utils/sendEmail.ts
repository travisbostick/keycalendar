import nodemailer from 'nodemailer';

export async function sendEmail(
  email: string,
  url: string,
  subject: string,
  text: string
) {
  let account = await nodemailer.createTestAccount();

  // console.log(account);

  let transporter = nodemailer.createTransport({
    name: account.smtp.host,
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });
  const mailOptions = {
    from: '<no-reply@example.com>',
    to: email,
    subject,
    text,
    html: `<a href="${url}">${url}</a>`
  };

  transporter
    .sendMail(mailOptions)
    .then(info => {
      // console.log(info.messageId);
      // console.log(info.response);
      // console.log(info.envelope);
      console.log(nodemailer.getTestMessageUrl(info));
      console.log('email sent');
    })
    .catch(err => {
      console.log(err);
      console.log('email not sent');
    });
}
