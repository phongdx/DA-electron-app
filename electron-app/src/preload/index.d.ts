import { ElectronAPI } from '@electron-toolkit/preload'

export {}

interface Api {
  fetchProducts: (searchTerm: string) => Promise<Product[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
