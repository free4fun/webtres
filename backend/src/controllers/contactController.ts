import { Request, Response } from "express"
import fetch from "node-fetch"
import { sendMail } from "../utils/mailer"

interface ContactRequest {
  name: string
  email: string
  message: string
  hcaptchaToken?: string
}

export const handleContact = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message, hcaptchaToken } = req.body as ContactRequest

  if (!name || !email || !message || !hcaptchaToken) {
    res.status(400).json({ error: "Campos obligatorios faltantes." }); return;
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
    res.status(403).json({ error: "Captcha inválido" }); return;
  }

  try {
    await sendMail(
      process.env.CONTACT_RECEIVER || "",
      `📬 Nuevo mensaje de contacto de ${name}`,
      `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong><br/>${message}</p>`
    )

    res.status(200).json({ success: true }); return;
  } catch (err) {
    console.error("❌ Error al enviar email:", err)
    res.status(500).json({ error: true }); return;
  }
}
