export type DBType = 'MSSQL' | 'HANA'

export type DatabaseConfig = {
  type: DBType
  host: string
  user: string
  password: string
  database: string
}
