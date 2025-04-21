import { addBlogPost } from "../services/api"

const handleSubmit = async () => {
  try {
    await addBlogPost("es", {
      slug: "mi-post",
      title: "Mi título",
      summary: "Resumen",
      content: "Contenido completo",
      date: new Date().toISOString(),
      tags: ["web3", "blog"],
    })
    alert("Post agregado con éxito")
  } catch (err) {
    alert("Error al agregar post")
  }
}
