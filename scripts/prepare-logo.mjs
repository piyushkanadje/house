import { execSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const source = join(root, 'images', 'website_logo.png')
const outDir = join(root, 'public', 'assets', 'images')
const logoOut = join(outDir, 'website-logo.png')
const faviconOut = join(outDir, 'favicon.png')

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

function hasSips() {
  try {
    execSync('which sips', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

if (!existsSync(source)) {
  console.warn('Skip logo: images/website_logo.png not found')
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })

if (hasSips()) {
  run('cp', [source, logoOut])
  run('sips', ['-Z', '480', logoOut])
  run('cp', [source, faviconOut])
  run('sips', ['-Z', '192', faviconOut])
} else {
  run('cp', [source, logoOut])
  run('cp', [source, faviconOut])
}

console.log(`Logo: ${logoOut}`)
console.log(`Favicon: ${faviconOut}`)
