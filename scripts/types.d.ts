export type WinService = {
  name: string
  exe: string
  exeDir: string
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
  // logRotation?: 0 | 1
  // logRotationOnline?: 0 | 1
  logMaxSize?: number
  logMaxTime?: number
  logErrorFile?: string
  logOutputFile?: string
}
