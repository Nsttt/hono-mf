// API utilities that will be exposed via Module Federation
export interface User {
  id: number
  name: string
  email: string
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3001/api/users')
  const data = await response.json() as { users: User[] }
  return data.users
}

export async function checkRemoteHealth(): Promise<{ status: string; service: string }> {
  const response = await fetch('http://localhost:3001/health')
  return await response.json() as { status: string; service: string }
}

export const apiClient = {
  baseUrl: 'http://localhost:3001',
  endpoints: {
    users: '/api/users',
    health: '/health'
  }
}