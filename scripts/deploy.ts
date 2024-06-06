import { $ } from 'bun'
import type { WinService } from './types'

// ${nssm}  x64
const nssm = './resources/nssm-2.24/win64/nssm.exe'

const service: WinService = {
  binaryPath: process.env['BINARY_PATH']!,
  dependencies: [],
  description: 'My service',
  displayName: 'My Service',
  errorControl: 'normal',
} as any

await $`echo "Hello, World! ${process.env['FOO']}"`

//use nssm to setup a service

await $`${nssm} install test-seidor-ws "
    c:\\path\\to\\my\\app.exe
"`

await $`echo "Hello, World!"`
