export const authFetch = async (url: string,options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem("jwt")
  const headers: HeadersInit = {...(options.headers || {}), Authorization: `Bearer ${token}`,"Content-Type": "application/json",}
  return fetch(url, {
    ...options,
    headers,
  })
}
