import { $ } from 'bun'
import { env } from '../src/env'

try {
  const nssm = 'resources/nssm-2.24/win64/nssm.exe'

  const envMode = env.NODE_ENV

  try {
    let serviceStatus = await $`${nssm} status ${env.SC_NAME}`.text()
    serviceStatus = serviceStatus.trim().replaceAll('\n', '')

    console.log(`\n-----------------------------------------------------------`)
    console.log(`\n Current service status:   ${serviceStatus}\n`)
    console.log(`-----------------------------------------------------------`)
  } catch (error: any) {
    throw new Error(`Service ${env.SC_NAME} does not exits or it's not running`)
  }

  switch (envMode) {
    case 'test':
      console.log('Editing test service...')
      break
    case 'production':
      console.warn('Editing production service...')
      break
    default:
      throw new Error('Unknown environment')
  }

  await $`${nssm} edit ${env.SC_NAME}`

  console.log(`
  

███████ ██    ██  ██████  ██████ ███████ ███████ ███████
██      ██    ██ ██      ██      ██      ██      ██     
███████ ██    ██ ██      ██      █████   ███████ ███████
     ██ ██    ██ ██      ██      ██           ██      ██            
███████  ██████   ██████  ██████ ███████ ███████ ███████ 
      
    
    `)
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
