export type ServiceLayerConfig = {
  baseUrl: string
  user: string
  password: string
  dbName: string
}

export type ServiceLayerSession = {
  Version: string
  SessionId: string
  SessionTimeout: number
}

export type SLErrorResponse = {
  error: {
    code: string
    details: {
      code: string
      message: string
    }
    message: string
  }
}
