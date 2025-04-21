import { sendMail } from '../../utils/mailer'

export const handleContactForm = async (req: Request, res: Response) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  const html = `<h3>Nuevo mensaje de contacto</h3>
  <p><strong>Nombre:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Mensaje:</strong> ${message}</p>`

  await sendMail("contacto@webtres.uy", "Nuevo mensaje de contacto", html)
  return res.status(200).json({ success: true, message: "Enviado correctamente" })
}
