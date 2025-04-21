export const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const token = localStorage.getItem('jwt')
  
    const headers = {
      ...(init.headers || {}),
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  
    return fetch(input, {
      ...init,
      headers
    })
  }
  