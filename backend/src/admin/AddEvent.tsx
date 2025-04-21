const addEvent = async (event: {
    slug: string
    title: string
    description: string
    details: string
    date: string
    location: string
    image?: string
  }) => {
    const res = await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
  
    const result = await res.json()
    if (!res.ok) throw new Error(result.error || "Error")
    return result
  }
  