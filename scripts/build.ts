import { $ } from 'bun'
import { env } from '../src/env'

const nssm = 'resources/nssm-2.24/win64/nssm.exe'

try {
  const nssm = 'resources/nssm-2.24/win64/nssm.exe'

  const envMode = env.NODE_ENV
  let buildMsg = ''
  let buildCommand = ''

  switch (envMode) {
    case 'test':
      buildMsg = '🔨 Building executable for TEST environment...'
      buildCommand = 'bun build --compile --minify --sourcemap src/index.ts --outfile bin/test/app-test-x64'
      break
    case 'production':
      buildMsg = '⚒️ Building executable for PRODUCTION environment...'
      buildCommand = 'bun build --compile --minify --sourcemap src/index.ts --outfile bin/production/app-prod-x64'
      break
    default:
      throw new Error('Unknown environment')
  }

  try {
    console.log('Checking service status... \n')

    let serviceStatus = await $`${nssm} status ${env.SC_NAME}`.text()
    serviceStatus = serviceStatus.trim().replaceAll('\n', '')

    console.log(`-----------------------------------------------------------`)
    console.log(`Current service status:   ${serviceStatus}`)
    console.log(`-----------------------------------------------------------`)

    if (serviceStatus === 'SERVICE_RUNNING') {
      console.log('Service is running, stopping service in order to build...')
    }
    await $`${nssm} stop ${env.SC_NAME}`
  } catch (error: any) {
    console.warn('Service is not running, proceeding to build...')
  } finally {
    console.log('\n**************************************************************\n')
    console.log(buildMsg + '\n')
  }

  await $`${buildCommand}`
} catch (error: any) {
  console.error(`
  
UPS!!

  `)
}
