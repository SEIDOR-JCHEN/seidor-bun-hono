import { $ } from 'bun'
import { env } from '../src/env'

// ${nssm}  x64
const nssm = 'resources/nssm-2.24/win64/nssm.exe'

//use nssm to setup a service

// if (env.SC_EXE) {
//   await $`${nssm} set ${env.SC_NAME} Application ${env.SC_EXE_DIR}`
// }

// if (env.SC_EXE_DIR) {
//   await $`${nssm} set ${env.SC_EXE_DIR} AppDirectory ${env.SC_EXE_DIR}`
// }

if (env.SC_DISPLAY_NAME) {
  await $`${nssm} set ${env.SC_NAME} DisplayName ${env.SC_DISPLAY_NAME}`
}

if (env.SC_START) {
  await $`${nssm} set ${env.SC_NAME} Start ${env.SC_START}`
}

if (env.SC_DEPENDENCIES) {
  for (const dep of env.SC_DEPENDENCIES) {
    await $`${nssm} set ${env.SC_NAME} DependOnService ${dep}`
  }
}

if (env.SC_LOG_MAX_SIZE) {
  await $`${nssm} set ${env.SC_NAME} AppRotateBytes ${env.SC_LOG_MAX_SIZE}`
}

if (env.SC_LOG_MAX_TIME) {
  await $`${nssm} set ${env.SC_NAME} AppRotateSeconds ${env.SC_LOG_MAX_TIME}`
}

if (env.SC_LOG_ROTATION) {
  await $`${nssm} set ${env.SC_NAME} AppRotateFiles  ${env.SC_LOG_ROTATION}`
}

if (env.SC_LOG_ERROR) {
  await $`${nssm} set ${env.SC_NAME} AppStderr ${env.SC_LOG_ERROR}`
}

if (env.SC_LOG_OUTPUT) {
  await $`${nssm} set ${env.SC_NAME} AppStdout ${env.SC_LOG_OUTPUT}`
}

const envMode = env.NODE_ENV

let envFile: string = ''

// let service: WinService = {
//   name: process.env['SERVICE_NAME']!,
//   description: process.env['SERVICE_DESCRIPTION']!,
//   displayName: process.env['SERVICE_DISPLAY_NAME'],
//   binaryPath: process.env['SERVICE_EXE']!,
//   dependencies: ['B1LicenseService', 'b1s50000'],
//   errorControl: 'normal',

//   loadOrderGroup: 'Network',
// }

switch (envMode) {
  case 'test':
    console.log('Test')
    envFile = '.env.test'
    break
  case 'production':
    console.log('Production')
    envFile = '.env.production'
    break
  default:
    console.log('Unknown')
    throw new Error('Unknown environment')
}

const file = Bun.file(envFile)

const text = await file.text()

let serviceEnvs = ''

text.split('\n').map(async (line) => {
  const [key, value] = line.split('=')
  if (key && value) {
    if (key.trim().startsWith('#') || key.trim().startsWith('SC')) return
    serviceEnvs += `${key.trim()}=${value.trim()}\n`
    console.log(`Env: ${key.trim()}=${value.trim()}`)
  }
})

await $`${nssm} set ${env.SC_NAME} AppEnvironmentExtra ${serviceEnvs}`

await $`${nssm} restart ${env.SC_NAME}`

await $`echo "Finished setting up service!"`
