import { $ } from 'bun'
import { env } from '../src/env'
import type { WinService } from './types'

const nssm = 'resources/nssm-2.24/win64/nssm.exe'

//Remove the last directory from the path (scripts)
const baseDir = import.meta.dir.split('\\').reduce((acc, cur, idx, arr) => {
  if (idx == arr.length - 1) return acc
  return acc + cur + '\\'
}, '')

let appName = ''
let appDir = ''
let appExe = ''

const envMode = env.NODE_ENV
let envFile: string = ''

switch (envMode) {
  case 'test':
    envFile = '.env.test'
    appName = 'app-test-x64.exe'
    appDir = baseDir + 'bin\\test'
    appExe = `${appDir}\\${appName}`
    break
  case 'production':
    envFile = '.env.production'
    appName = 'app-prod-x64.exe'
    appDir = baseDir + 'bin\\production'
    appExe = `${appDir}\\${appName}`
    break
  default:
    throw new Error('Unknown environment')
}

const outputLog = `${appDir}\\logs\\outputs`
const errorLog = `${appDir}\\logs\\errors`

await $`mkdir ${appDir}\\logs`
await $`mkdir ${outputLog}`
await $`mkdir ${errorLog}`

let serviceStatus = ''

try {
  serviceStatus = await $`${nssm} status ${env.SC_NAME}`.text()
  serviceStatus = serviceStatus.trim().replaceAll('\n', '')

  console.log(`Current service status: ${serviceStatus}`)
} catch (error: any) {
  if (error.exitCode == 3) {
    console.log('Service not found, installing...')
    await $`${nssm} install ${env.SC_NAME} ${appExe}`
  }
}

let service: WinService = {
  name: env.SC_NAME,
  exe: appExe,
  exeDir: appDir,
  description: env.SC_DESCRIPTION,
  displayName: env.SC_DISPLAY_NAME,
  // dependencies: ['B1LicenseService', 'b1s50000'],
  dependencies: env.SC_DEPENDENCIES ?? [],
  startType: env.SC_START ? env.SC_START : 'SERVICE_DELAYED_AUTO_START',
  logRotation: env.SC_LOG_ROTATION ? 1 : 0,
  logMaxSize: env.SC_LOG_MAX_SIZE ? env.SC_LOG_MAX_SIZE : 1048576,
  logMaxTime: env.SC_LOG_MAX_TIME ? env.SC_LOG_MAX_TIME : 86400,
  logErrorFile: env.SC_LOG_ERROR ? errorLog + '\\error.txt' : '',
  logOutputFile: env.SC_LOG_OUTPUT ? outputLog + '\\output.txt' : '',
}

await $`${nssm} set ${service.name} Application ${service.exe}`
await $`${nssm} set ${service.name} AppDirectory ${service.exeDir}`
await $`${nssm} set ${service.name} Description ${service.description}`
await $`${nssm} set ${service.name} DisplayName ${service.displayName}`
await $`${nssm} set ${service.name} Start ${service.startType}`
await $`${nssm} set ${service.name} AppRotateFiles  ${service.logRotation}`
await $`${nssm} set ${service.name} AppRotateBytes ${service.logMaxSize}`
await $`${nssm} set ${service.name} AppRotateSeconds ${service.logMaxTime}`

if (service.logErrorFile) {
  await $`${nssm} set ${service.name} AppStderr ${service.logErrorFile}`
}

if (service.logOutputFile) {
  await $`${nssm} set ${service.name} AppStdout ${service.logOutputFile}`
}

for (const dep of service.dependencies ?? []) {
  await $`${nssm} set ${env.SC_NAME} DependOnService ${dep}`
}

const file = Bun.file(envFile)

const text = await file.text()

let serviceEnvs = ''

text.split('\n').map(async (line) => {
  const [key, value] = line.split('=')
  if (key && value) {
    if (key.trim().startsWith('#')) return
    serviceEnvs += `${key.trim()}=${value.trim()}\n`
    console.log(`Env: ${key.trim()}=${value.trim()}`)
  }
})

await $`${nssm} set ${env.SC_NAME} AppEnvironmentExtra ${serviceEnvs}`

console.log('Finished setting up service!')

await $`${nssm} restart ${env.SC_NAME}`
