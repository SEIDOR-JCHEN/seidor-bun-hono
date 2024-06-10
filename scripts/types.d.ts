export type WinService = {
  name: string
  exe: string
  displayName?: string
  description?: string
  startType?: 'SERVICE_AUTO_START' | 'SERVICE_DEMAND_START' | 'SERVICE_DISABLED' | 'SERVICE_DELAYED_AUTO_START'
  account?: {
    domain: string
    username: string
    password: string
  }
  dependencies?: string[]
  serviceType?: 'SERVICE_WIN32_OWN_PROCESS' | 'SERVICE_INTERACTIVE_PROCESS'
  errorControl: string
  loadOrderGroup: string
}
