import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendMail = async (to: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: `"webtres" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}
