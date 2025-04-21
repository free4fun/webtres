import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"webtres.uy" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}
