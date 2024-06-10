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

    //Windows Service
    SC_NAME: z.string().optional(),
    SC_EXE: z.string().optional(),
    SC_EXE_DIR: z.string().optional(),
    SC_DISPLAY_NAME: z.string().optional(),
    SC_DESCRIPTION: z.string().optional(),
    SC_START: z.enum(['SERVICE_AUTO_START', 'SERVICE_DEMAND_START', 'SERVICE_DISABLED', 'SERVICE_DELAYED_AUTO_START']).optional(),
    SC_TYPE: z.enum(['SERVICE_WIN32_OWN_PROCESS', 'SERVICE_INTERACTIVE_PROCESS']).optional(),
    SC_ACCOUNT_DOMAIN: z.string().optional(),
    SC_ACCOUNT_USERNAME: z.string().optional(),
    SC_ACCOUNT_PASSWORD: z.string().optional(),
    SC_DEPENDENCIES: z.string().optional(),
    SC_LOG_MAX_TIME: z.coerce.number().optional(),
    SC_LOG_MAX_SIZE: z.coerce.number().optional(),
    // SC_LOG_ROTATION: z.coerce.number().optional(),
    // SC_LOG_ROTATION_ONLINE: z.coerce.number().optional(),
    SC_LOG_ERROR: z.string().optional(),
    SC_LOG_OUTPUT: z.string().optional(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
