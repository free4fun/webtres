import { useEffect, useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { authFetch } from '@/lib/authFetch'
import { publicFetch } from '@/lib/publicFetch'
import { useNavigate } from 'react-router-dom'
import { BlogPost } from '@/data/blog/types'
import { Event } from '@/data/events/types'

type Mode = 'post' | 'event'

const ITEMS_PER_PAGE = 6

const AdminDashboard = () => {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [checkedAuth, setCheckedAuth] = useState(false)
  const [mode, setMode] = useState<Mode>('post')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [originalSlug, setOriginalSlug] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lang, setLang] = useState('es')
  const [form, setForm] = useState({
    slug: '',
    title: '',
    summary: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    tags: '',
    image: '',
    location: '',
    description: '',
    details: ''
  })

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt')
      if (!token) return navigate('/login')

      const res = await authFetch(`${API}/api/auth/validate`)
      if (!res.ok) {
        localStorage.removeItem('jwt')
        navigate('/login')
      } else {
        setCheckedAuth(true)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (!checkedAuth) return
    ;(async () => {
      const blogUrl = mode === 'post' ? `${API}/api/blog/${lang}` : null
      const eventUrl = mode === 'event' ? `${API}/api/events` : null
  
      const fetches = []
      if (blogUrl) fetches.push(publicFetch(blogUrl))
      if (eventUrl) fetches.push(publicFetch(eventUrl))
  
      const [postsRes, eventsRes] = await Promise.all(fetches)
  
      if (mode === 'post' && postsRes?.ok) {
        setPosts(await postsRes.json())
      }
      if (mode === 'event' && eventsRes?.ok) {
        setEvents(await eventsRes.json())
      }
    })()
  }, [checkedAuth, lang, mode])
  

  useEffect(() => {
    setCurrentPage(1)
  }, [mode])

  const visibleItems = useMemo(() => {
    const source = mode === 'post' ? posts : events
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return source.slice(start, start + ITEMS_PER_PAGE)
  }, [posts, events, currentPage, mode])

  const totalPages = useMemo(() => {
    const source = mode === 'post' ? posts : events
    return Math.max(1, Math.ceil(source.length / ITEMS_PER_PAGE))
  }, [posts, events, mode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setIsEditing(false)
    setOriginalSlug(null)
    setForm({
      slug: '',
      title: '',
      summary: '',
      content: '',
      date: new Date().toISOString().slice(0, 10),
      tags: '',
      image: '',
      location: '',
      description: '',
      details: ''
    })
  }

  const handleEdit = (item: any) => {
    setIsEditing(true)
    setOriginalSlug(item.slug)
    setForm({
      slug: item.slug,
      title: item.title,
      summary: item.summary || '',
      content: item.content || '',
      date: item.date,
      tags: item.tags?.join(', ') || '',
      image: item.image || '',
      location: item.location || '',
      description: item.description || '',
      details: item.details || ''
    })
  }

  const handleDelete = async (slugToDelete: string) => {
    if (!confirm("¿Seguro que querés eliminar este contenido?")) return
    const endpoint = mode === 'post' ? `${API}/api/blog/${slugToDelete}?lang=${lang}` : `${API}/api/events/${slugToDelete}`
  

    const res = await authFetch(endpoint, { method: 'DELETE' })
    if (res.ok) {
      setSuccess("Contenido eliminado")
      const [postsRes, eventsRes] = await Promise.all([
        authFetch(`${API}/api/blog/es`),
        authFetch(`${API}/api/events`)
      ])
      if (postsRes.ok) setPosts(await postsRes.json())
      if (eventsRes.ok) setEvents(await eventsRes.json())
    } else {
      const data = await res.json()
      setError(data.error || "Error al eliminar")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
  
    if (!file.type.startsWith('image/')) {
      alert('Por favor seleccioná un archivo de imagen válido.')
      return
    }
  
    
    const previewUrl = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, image: previewUrl })) 
  
    
    const formData = new FormData()
    formData.append("image", file)
  
    const uploadEndpoint = mode === 'post' ? '/api/upload-image/post' : '/api/upload-image/event'
    const res = await fetch(`${API}${uploadEndpoint}`, {
      method: "POST",
      body: formData,
    })
  
    const data = await res.json()
    if (res.ok && data.path) {
      
      setForm(prev => ({ ...prev, image: data.path }))
    } else {
      alert("Error al subir imagen.")
    }
  }
  
  

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    const requiredFields = mode === 'post'
      ? ['slug', 'title', 'summary', 'content', 'date', 'tags', 'image']
      : ['slug', 'title', 'description', 'details', 'date', 'location', 'image']

    const emptyField = requiredFields.find(f => !form[f as keyof typeof form])
    if (emptyField) return setError(`El campo "${emptyField}" es obligatorio.`)

    const targetList = mode === 'post' ? posts : events
    const slugExists = targetList.some(item => item.slug === form.slug)
    if (slugExists && (!isEditing || form.slug !== originalSlug)) {
      return setError("Ya existe un contenido con este slug.")
    }

    let payload: any
    if (mode === 'post') {
      payload = {
        slug: form.slug,
        title: form.title,
        summary: form.summary,
        content: form.content,
        date: form.date,
        tags: form.tags.split(',').map(t => t.trim()),
        image: form.image
      }
    } else {
      payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        details: form.details,
        date: form.date,
        location: form.location,
        image: form.image
      }
    }

    const base = mode === 'post' ? '/api/blog' : '/api/events'
    const endpoint = isEditing && originalSlug
      ? mode === 'post'
        ? `${base}/${originalSlug}?lang=${lang}`
        : `${base}/${originalSlug}`
      : mode === 'post'
        ? `${base}/${lang}`
        : base

    const res = await authFetch(endpoint, {
      method: isEditing ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      resetForm()
      const [postsRes, eventsRes] = await Promise.all([
        publicFetch(`${API}/api/blog/es`),
        publicFetch(`${API}/api/events`)
      ])
      if (postsRes.ok) setPosts(await postsRes.json())
      if (eventsRes.ok) setEvents(await eventsRes.json())
      setSuccess("Guardado correctamente")
    } else {
      const data = await res.json()
      setError(data.error || "Error al guardar")
    }
  }

  if (!checkedAuth) return <div className="text-center py-20 text-muted-foreground">Verificando sesión...</div>

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <h2 className="text-2xl font-bold text-center">Panel Admin</h2>

      <div className="flex justify-center gap-4">
        <Button variant={mode === 'post' ? 'default' : 'outline'} onClick={() => setMode('post')}>Ver Posts</Button>
        <Button variant={mode === 'event' ? 'default' : 'outline'} onClick={() => setMode('event')}>Ver Eventos</Button>
      </div>

      <div className="space-y-4">
        <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
        <Input name="date" type="date" value={form.date} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image && (
          <img src={form.image.startsWith('/images/') ? form.image : `${API}${form.image}`} alt="Vista previa" className="w-full h-48 object-cover rounded border mt-2" />
        )}

        {mode === 'post' ? (
          <>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="block w-full border rounded p-2">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
            <Input name="summary" placeholder="Resumen" value={form.summary} onChange={handleChange} />
            <Input name="tags" placeholder="Etiquetas (separadas por coma)" value={form.tags} onChange={handleChange} />
            <Textarea name="content" placeholder="Contenido" value={form.content} onChange={handleChange} />
          </>
        ) : (
          <>
            <Input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} />
            <Textarea name="description" placeholder="Descripción corta" value={form.description} onChange={handleChange} />
            <Textarea name="details" placeholder="Detalles del evento" value={form.details} onChange={handleChange} />
          </>
        )}

        <Button className="w-full" onClick={handleSubmit}>
          {isEditing ? 'Actualizar' : 'Guardar'} {mode === 'post' ? 'Post' : 'Evento'}
        </Button>
        {isEditing && <Button variant="outline" className="w-full" onClick={resetForm}>Cancelar edición</Button>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>

      <div className="border-t pt-6 space-y-2" key={`${mode}-${currentPage}`}>
        <ul className="space-y-2 text-sm">
          {visibleItems.map((item: BlogPost | Event) => (
            <li key={item.slug} className="flex justify-between items-start border-b pb-2">
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.date} {mode === 'event' && 'location' in item && ` - ${item.location}`}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.slug)}>Borrar</Button>
              </div>
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>← Anterior</Button>
          <span className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</span>
          <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Siguiente →</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
