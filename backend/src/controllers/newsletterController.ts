import { Request, Response } from "express"
import fetch from "node-fetch"
import { sendMail } from "../utils/mailer"

interface NewsletterRequest {
  name: string
  email: string
  hcaptchaToken?: string
}

export const handleNewsletter = async (req: Request, res: Response): Promise<void> => {
  const { name, email, hcaptchaToken } = req.body as NewsletterRequest

  if (!name || !email || !hcaptchaToken) {
    res.status(400).json({ error: "Missing Required Fields" }); return;
  }

  // Validate hCaptcha
  const params = new URLSearchParams({
    secret: process.env.HCAPTCHA_SECRET || "",
    response: hcaptchaToken
  })

  const captchaRes = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  })

  interface CaptchaResponse {
    success: boolean
    challenge_ts?: string
    hostname?: string
    [key: string]: any
  }

  const captchaData = await captchaRes.json() as CaptchaResponse

  if (!captchaData.success) {
    res.status(403).json({ error: "Invalid Captcha" }); return;
  }

  try {
    await sendMail(
      process.env.CONTACT_RECEIVER || "",
      `📬 Nuevo mensaje de contacto de ${name}`,
      `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`
    )

    res.status(200).json({ success: true }); return;
  } catch (err) {
    //console.error("Error sending email", err)
    res.status(500).json({ error: true }); return;
  }
}
