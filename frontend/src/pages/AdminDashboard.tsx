import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { authFetch } from '@/lib/authFetch'
import { useNavigate } from 'react-router-dom'

type Mode = 'post' | 'event'

const AdminDashboard = () => {
    const [mode, setMode] = useState<Mode>('post')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [posts, setPosts] = useState([])
    const [events, setEvents] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [originalSlug, setOriginalSlug] = useState<string | null>(null)

    const navigate = useNavigate()
  
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            navigate('/login')
            return
        }
        (async ()  => {
            const [postsRes, eventsRes] = await Promise.all([
                authFetch('/api/blog/es'),
                authFetch('/api/events'),
            ])
            if (postsRes.ok) setPosts(await postsRes.json())
            if (eventsRes.ok) setEvents(await eventsRes.json())
        })()
    }, [navigate])
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEdit = (item: any) => {
        setMode(mode)
        setIsEditing(true)
        setOriginalSlug(item.slug)
        setForm({
          slug: item.slug,
          title: item.title,
          summary: item.summary || '',
          content: item.content || '',
          date: item.date,
          tags: item.tags ? item.tags.join(', ') : '',
          image: item.image || '',
          location: item.location || '',
          description: item.description || '',
          details: item.details || ''
        })
      }

      const handleSubmit = async () => {
        setError('')
        setSuccess('')
      
        const targetList = mode === 'post' ? posts : events
        const slugExists = targetList.some((item: any) => item.slug === form.slug)
      
        // Si ya existe y no es el original en modo edición → error
        if (slugExists && (!isEditing || form.slug !== originalSlug)) {
          setError('⚠️ Ya existe un contenido con este slug. Elegí uno distinto.')
          return
        }
      
        const payload =
          mode === 'post'
            ? {
                slug: form.slug,
                title: form.title,
                summary: form.summary,
                content: form.content,
                date: form.date,
                tags: form.tags.split(',').map(t => t.trim()),
                image: form.image
              }
            : {
                slug: form.slug,
                title: form.title,
                description: form.description,
                details: form.details,
                date: form.date,
                location: form.location,
                image: form.image
              }
      
        const base = mode === 'post' ? '/api/blog' : '/api/events'
        const endpoint = isEditing && originalSlug
          ? `${base}/${originalSlug}`
          : mode === 'post'
            ? `${base}/es`
            : base
      
        const res = await authFetch(endpoint, {
          method: isEditing ? 'PUT' : 'POST',
          body: JSON.stringify(payload)
        })
      
        if (res.ok) {
          setSuccess(`${isEditing ? 'Actualización' : 'Guardado'} correcto ✅`)
          setError('')
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
          // Recargar los datos actualizados
          const updatedPosts = await authFetch('/api/blog/es')
          const updatedEvents = await authFetch('/api/events')
          if (updatedPosts.ok) setPosts(await updatedPosts.json())
          if (updatedEvents.ok) setEvents(await updatedEvents.json())
        } else {
          const data = await res.json()
          setError(data.error || 'Error al guardar')
        }
      }
      

    return (
        <div className="max-w-xl mx-auto py-12 space-y-6">
            <h2 className="text-2xl font-bold text-center">Panel Admin</h2>
            <div className="flex justify-center gap-4">
                <Button variant={mode === 'post' ? 'default' : 'outline'} onClick={() => setMode('post')}>Agregar Post</Button>
                <Button variant={mode === 'event' ? 'default' : 'outline'} onClick={() => setMode('event')}>Agregar Evento</Button>
            </div>
            <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
            <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
            <Input name="date" type="date" value={form.date} onChange={handleChange} />
            <Input name="image" placeholder="URL de imagen" value={form.image} onChange={handleChange} />
            {mode === 'post' ? (
                <>
                    <Input name="summary" placeholder="Resumen" value={form.summary} onChange={handleChange} />
                    <Input name="tags" placeholder="Etiquetas (separadas por coma)" value={form.tags} onChange={handleChange} />
                    <Textarea name="content" placeholder="Contenido" value={form.content} rows={6} onChange={handleChange} />
                </>
            ) : (
                <>
                    <Input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} />
                    <Textarea name="description" placeholder="Descripción corta" value={form.description} rows={2} onChange={handleChange} />
                    <Textarea name="details" placeholder="Detalles del evento" value={form.details} rows={5} onChange={handleChange} />
                </>
            )}
            {mode === 'post' ? (
            <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                {posts.slice(-5).reverse().map((p: any) => (
                    <li key={p.slug} className="flex justify-between items-center gap-2"><span><strong>{p.title}</strong> ({p.date})</span><Button size="sm" variant="outline" onClick={() => handleEdit(p)}>Editar</Button></li>
                ))}
            </ul>
            ) : (
            <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                {events.slice(-5).reverse().map((e: any) => (
                    <li key={e.slug} className="flex justify-between items-center gap-2"><span><strong>{e.title}</strong> ({e.date} - {e.location})</span><Button size="sm" variant="outline" onClick={() => handleEdit(e)}>Editar</Button></li>
                ))}
            </ul>
            )}
            <Button onClick={handleSubmit} className="w-full">{mode === 'post' ? 'Guardar Post' : 'Guardar Evento'}</Button>
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {mode === 'post' ? (
                <div className="pt-12">
                    <h3 className="text-lg font-semibold mb-2">📝 Últimos Posts</h3>
                    <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                        {posts.slice(-5).reverse().map((p: any) => (
                            <li key={p.slug}><strong>{p.title}</strong> ({p.date})</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="pt-12">
                    <h3 className="text-lg font-semibold mb-2">📅 Últimos Eventos</h3>
                    <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                        {events.slice(-5).reverse().map((e: any) => (
                            <li key={e.slug}><strong>{e.title}</strong> ({e.date} - {e.location})</li>
                        ))}
                    </ul>
                </div>
            )}
            {isEditing && (<Button variant="outline" className="w-full" onClick={() => {setIsEditing(false); setOriginalSlug(null); setForm({ slug: '', title: '', summary: '', content: '', date: new Date().toISOString().slice(0, 10), tags: '', image: '', location: '', description: '', details: '' });}}>Cancelar edición</Button>)}
        </div>
    )
}

export default AdminDashboard
