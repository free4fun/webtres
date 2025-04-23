import express, { Request, Response } from "express"
import { sendMail } from "../utils/mailer"
import fetch from "node-fetch"

const router = express.Router()

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { name, email, message, hcaptchaToken } = req.body

  if (!name || !email || !message || !hcaptchaToken) {
    res.status(400).json({ error: "Missing required fields" }); return;
  }

  const body = new URLSearchParams({
    secret: process.env.HCAPTCHA_SECRET || "",
    response: hcaptchaToken,
  })

  const captchaRes = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  })

  const captchaData = await captchaRes.json() as { success: boolean }

  if (!captchaData.success) {
    res.status(403).json({ error: "Invalid captcha" }); return;
  }

  try {
    await sendMail(
      process.env.CONTACT_RECEIVER || "",
      `📬 Nuevo mensaje de contacto de ${name}`,
      `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong><br/>${message}</p>`
    )
    res.status(200).json({ success: true }); return;
  } catch (error) {
    res.status(500).json({ error: true }); return;
  }
})

export default router
