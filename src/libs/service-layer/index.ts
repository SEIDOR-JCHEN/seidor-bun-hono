import axios, { isAxiosError } from 'axios'
import { env } from '../../env'
import type { SLErrorResponse, ServiceLayerConfig, ServiceLayerSession } from '../../types/service-layer'
import { SLEntityEnum } from './entities'

export default class ServiceLayer {
  private baseUrl: string
  private user: string
  private password: string
  private dbName: string

  constructor(slConfig?: ServiceLayerConfig) {
    if (slConfig) {
      this.baseUrl = slConfig.baseUrl
      this.user = slConfig.user
      this.password = slConfig.password
      this.dbName = slConfig.dbName
    } else {
      //Using Environment Variables
      this.baseUrl = env.SBO_SL_BASE_URL
      this.user = env.SBO_SL_USER
      this.password = env.SBO_SL_PASSWD
      this.dbName = env.SBO_SL_DB_NAME
    }
  }

  private async login(slConfig: ServiceLayerConfig): Promise<ServiceLayerSession> {
    console.log(`Logging in to Service Layer...`)

    try {
      const result = await axios.post(`${slConfig.baseUrl}/b1s/v1/${SLEntityEnum.Login}}`, {
        UserName: slConfig.user,
        Password: slConfig.password,
        CompanyDB: slConfig.dbName,
      })

      return result.data
    } catch (error: any) {
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data as SLErrorResponse
        console.error(`Error: ${errorResponse.error.message}`)
      }

      throw error
    }
  }

  public async getAll<T>(entity: SLEntityEnum): Promise<T[]> {
    console.log(`Getting all ${entity}...`)

    try {
      const session = await this.login({
        baseUrl: this.baseUrl,
        user: this.user,
        password: this.password,
        dbName: this.dbName,
      })

      const result = await axios.get<T[]>(`${this.baseUrl}/b1s/v1/${entity}`, {
        headers: {
          Cookie: `B1SESSION=${session.SessionId}`,
        },
      })

      return result.data
    } catch (error: any) {
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data as SLErrorResponse
        console.error(`Error: ${errorResponse.error.message}`)
      }

      throw error
    }
  }

  public showInfo() {
    console.log(
      ` 
        Service Layer Info: 
        Base URL: ${this.baseUrl}
        User: ${this.user}
        Password: ${this.password}
        DB Name: ${this.dbName}

      `
    )
  }
}
