// Utility functions that will be exposed via Module Federation
export function add(...args: number[]): number {
  return args.reduce((sum, num) => sum + num, 0)
}

export function multiply(...args: number[]): number {
  return args.reduce((product, num) => product * num, 1)
}

export function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim()
}

export function createApiUrl(endpoint: string): string {
  return `http://localhost:3001/api/${endpoint}`
}

export const remoteConfig = {
  name: 'remote1',
  version: '1.0.0',
  description: 'Remote Hono application with federated utilities'
}