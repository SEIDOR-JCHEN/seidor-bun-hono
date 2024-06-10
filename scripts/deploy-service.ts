import { $, type BunFile } from 'bun'
import { env } from '../src/env'
import type { WinService } from './types'

try {
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
  let envLocalFile: string = ''

  switch (envMode) {
    case 'test':
      envLocalFile = '.env.test.local'
      envFile = '.env.test'
      appName = 'app-test-x64.exe'
      appDir = baseDir + 'bin\\test'
      appExe = `${appDir}\\${appName}`

      console.log(`
      

██████  ███████ ██████  ██       ██████  ██    ██     ████████ ███████ ███████ ████████ 
██   ██ ██      ██   ██ ██      ██    ██  ██  ██         ██    ██      ██         ██    
██   ██ █████   ██████  ██      ██    ██   ████          ██    █████   ███████    ██    
██   ██ ██      ██      ██      ██    ██    ██           ██    ██           ██    ██    
██████  ███████ ██      ███████  ██████     ██           ██    ███████ ███████    ██    


    `)
      break
    case 'production':
      envLocalFile = '.env.production.local'
      envFile = '.env.production'
      appName = 'app-prod-x64.exe'
      appDir = baseDir + 'bin\\production'
      appExe = `${appDir}\\${appName}`

      console.log(`
    

██████  ███████ ██████  ██       ██████  ██    ██     ██████  ██████   ██████  ██████  ██    ██  ██████ ████████ ██  ██████  ███    ██ 
██   ██ ██      ██   ██ ██      ██    ██  ██  ██      ██   ██ ██   ██ ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ████   ██ 
██   ██ █████   ██████  ██      ██    ██   ████       ██████  ██████  ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ██ ██  ██ 
██   ██ ██      ██      ██      ██    ██    ██        ██      ██   ██ ██    ██ ██   ██ ██    ██ ██         ██    ██ ██    ██ ██  ██ ██ 
██████  ███████ ██      ███████  ██████     ██        ██      ██   ██  ██████  ██████   ██████   ██████    ██    ██  ██████  ██   ████  


`)

      break
    default:
      throw new Error('Unknown environment')
  }

  const outputLog = `${appDir}\\logs\\outputs`
  const errorLog = `${appDir}\\logs\\errors`

  await $`bun exec ./scripts/utils/setupLogsFolders.bat`

  let serviceStatus = ''

  try {
    serviceStatus = await $`${nssm} status ${env.SC_NAME}`.text()
    serviceStatus = serviceStatus.trim().replaceAll('\n', '')

    console.log(`\n-----------------------------------------------------------`)
    console.log(`\n Current service status:   ${serviceStatus}\n`)
    console.log(`-----------------------------------------------------------`)

    console.log('Updating service...\n')
  } catch (error: any) {
    if (error.exitCode == 3) {
      console.log('Service not found, installing for the first time...')

      await $`${nssm} install ${env.SC_NAME} ${appExe}`
    }
  }

  let service: WinService = {
    name: env.SC_NAME!!,
    exe: appExe,
    exeDir: appDir,
    description: env.SC_DESCRIPTION ? env.SC_DESCRIPTION : env.SC_NAME,
    displayName: env.SC_DISPLAY_NAME ? env.SC_DISPLAY_NAME : env.SC_NAME,
    dependencies: env.SC_DEPENDENCIES,
    startType: env.SC_START ? env.SC_START : 'SERVICE_DELAYED_AUTO_START',
    logMaxSize: env.SC_LOG_MAX_SIZE ? env.SC_LOG_MAX_SIZE : 1048576,
    logMaxTime: env.SC_LOG_MAX_TIME ? env.SC_LOG_MAX_TIME : 86400,
    logErrorFile: env.SC_LOG_ERROR ? env.SC_LOG_ERROR : errorLog + '\\error.txt',
    logOutputFile: env.SC_LOG_OUTPUT ? env.SC_LOG_OUTPUT : outputLog + '\\output.txt',
  }

  console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░█▀▀░█▀▀░█▀▄░█░█░▀█▀░█▀▀░█▀▀░░░█▀▀░█▀▀░▀█▀░▀█▀░▀█▀░█▀█░█▀▀░█▀▀░░░░
░▀▀█░█▀▀░█▀▄░▀▄▀░░█░░█░░░█▀▀░░░▀▀█░█▀▀░░█░░░█░░░█░░█░█░█░█░▀▀█░░▀░
░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀░░░▀▀▀░▀▀▀░░▀░░░▀░░▀▀▀░▀░▀░▀▀▀░▀▀▀░░▀░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`)

  console.log('\n**************************************************************************\n')

  await $`${nssm} set ${service.name} Application ${service.exe}`
  await $`${nssm} set ${service.name} AppDirectory ${service.exeDir}`
  await $`${nssm} set ${service.name} Description ${service.description}`
  await $`${nssm} set ${service.name} DisplayName ${service.displayName}`
  await $`${nssm} set ${service.name} Start ${service.startType}`
  await $`${nssm} set ${service.name} AppRotateFiles 1` //Enable log rotation
  await $`${nssm} set ${service.name} AppRotateOnline 1` // Enable online log rotation
  await $`${nssm} set ${service.name} AppRotateBytes ${service.logMaxSize}`
  await $`${nssm} set ${service.name} AppRotateSeconds ${service.logMaxTime}`

  if (service.logErrorFile) {
    await $`${nssm} set ${service.name} AppStderr ${service.logErrorFile}`
  }

  if (service.logOutputFile) {
    await $`${nssm} set ${service.name} AppStdout ${service.logOutputFile}`
  }

  const depList = service.dependencies?.split(',')
  let deps = ''
  if (depList && depList.length > 0) {
    for (const dep of depList) {
      deps += `${dep.trim() + '\n'}`
    }
    await $`${nssm} set ${env.SC_NAME} DependOnService ${deps}`
  }

  console.log('\n**************************************************************************\n')

  console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░█▀▀░█▀█░█░█░▀█▀░█▀▄░█▀█░█▀█░█▄█░█▀▀░█▀█░▀█▀░░░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀░░░░
░█▀▀░█░█░▀▄▀░░█░░█▀▄░█░█░█░█░█░█░█▀▀░█░█░░█░░░░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█░░▀░
░▀▀▀░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀░░▀░░░░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀░░▀░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`)

  console.log('\n**************************************************************************\n')

  let file: BunFile

  if (await Bun.file(envLocalFile).exists()) {
    file = Bun.file(envLocalFile)
  } else {
    file = Bun.file(envFile)
  }

  const text = await file.text()
  let serviceEnvs = ''

  text.split('\n').map(async (line) => {
    const [key, value] = line.split('=')
    if (key && value) {
      if (key.trim().startsWith('#')) return
      serviceEnvs += `${key.trim()}=${value.trim()}\n`
      console.log(`${key.trim()} = ${value.trim()}`)
    }
  })

  console.log('\n**************************************************************************\n')

  await $`${nssm} set ${env.SC_NAME} AppEnvironmentExtra ${serviceEnvs}`

  console.log('Environment variables successfully set!\n')

  try {
    console.log('Restarting service...\n')

    await $`${nssm} restart ${env.SC_NAME}`

    console.log('\nService restarted!')

    console.log(`
  

███████ ██    ██  ██████  ██████ ███████ ███████ ███████
██      ██    ██ ██      ██      ██      ██      ██     
███████ ██    ██ ██      ██      █████   ███████ ███████
     ██ ██    ██ ██      ██      ██           ██      ██            
███████  ██████   ██████  ██████ ███████ ███████ ███████ 
      
    
    `)
  } catch (error: any) {
    console.error(`Error restarting service - ${error.message}`)
  }
} catch (error: any) {
  console.error(`
  

███████ ██████  ██████   ██████  ██████  
██      ██   ██ ██   ██ ██    ██ ██   ██ 
█████   ██████  ██████  ██    ██ ██████  
██      ██   ██ ██   ██ ██    ██ ██   ██ 
███████ ██   ██ ██   ██  ██████  ██   ██ 
    
Message: ${error.message}

`)
}
