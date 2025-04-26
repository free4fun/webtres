import { useState } from "react"

export const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const clearPreview = () => {
    setPreviewUrl(null)
  }

  return {
    previewUrl,
    handleFileChange,
    clearPreview,
  }
}
