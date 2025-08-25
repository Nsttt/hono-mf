import { createInstance } from '@module-federation/enhanced/runtime'

// Create Module Federation instance
const mf = createInstance({
  name: 'mf_host',
  remotes: [
    {
      name: 'remote1',
      entry: 'http://localhost:3001/mf-manifest.json',
      type: 'script',
    }
  ]
})

export async function loadRemoteUtils() {
  try {
    // Load remote utility functions
    const remoteUtils = await mf.loadRemote<{
      add: (...args: number[]) => number
      multiply: (...args: number[]) => number
      formatUserName: (first: string, last: string) => string
      createApiUrl: (endpoint: string) => string
      remoteConfig: any
    }>('remote1/utils')

    if (remoteUtils) {
      // Test the remote utilities
      const addResult = remoteUtils.add(1, 2, 3, 4)
      const multiplyResult = remoteUtils.multiply(2, 3, 4)
      const formattedName = remoteUtils.formatUserName('John', 'Doe')
      const apiUrl = remoteUtils.createApiUrl('users')

      return {
        success: true,
        results: {
          add: { input: [1, 2, 3, 4], output: addResult },
          multiply: { input: [2, 3, 4], output: multiplyResult },
          formatUserName: { input: ['John', 'Doe'], output: formattedName },
          createApiUrl: { input: 'users', output: apiUrl },
          remoteConfig: remoteUtils.remoteConfig
        }
      }
    } else {
      return { success: false, error: 'Failed to load remote utils' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function loadRemoteApi() {
  try {
    // Load remote API functions
    const remoteApi = await mf.loadRemote<{
      fetchUsers: () => Promise<any[]>
      checkRemoteHealth: () => Promise<{ status: string; service: string }>
      apiClient: any
    }>('remote1/api')

    if (remoteApi) {
      return {
        success: true,
        apiClient: remoteApi.apiClient,
        // Note: We're not calling the actual functions here since they make HTTP calls
        // In a real scenario, you might want to test these as well
      }
    } else {
      return { success: false, error: 'Failed to load remote API' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export { mf }