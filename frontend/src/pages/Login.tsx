import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('jwt', data.token)
      location.href = '/admin' // redirige a admin
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-16 space-y-4">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button className="w-full" onClick={handleLogin}>Iniciar sesión</Button>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </div>
  )
}

export default Login
