import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    //Application Configuration
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(3000),
    API_KEY: z.string(),

    //Service Layer
    SBO_SL_BASE_URL: z.string().url(),
    SBO_SL_USER: z.string(),
    SBO_SL_PASSWD: z.string(),
    SBO_SL_DB_NAME: z.string(),

    //Database
    SBO_DB_TYPE: z.enum(['MSSQL', 'HANA']).optional(),
    SBO_DB_HOST: z.string().optional(),
    SBO_DB_USER: z.string().optional(),
    SBO_DB_PASSWD: z.string().optional(),
    SBO_DB_NAME: z.string().optional(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
