import NullstackLogo from 'nullstack/logo'
import { camelize } from 'nullstack/shared/string'

import ViteIcon from '../components/ViteIcon'

export const PROJECTS = [
  // Replacing with your project data makes it usable for you
  {
    url: '',
    name: 'Nullstack',
    envKey: 'DEFAULT_KEY',
    originalUrl: 'https://github.com/nullstack/nullstack.github.io/tree/master',
    docsUrl: 'https://github.com/nullstack/nullstack.github.io/tree/master',
    Icon: () => NullstackLogo({ height: 20, light: true }),
  },
  {
    url: 'vite',
    name: 'Vite',
    envKey: 'VITE_KEY',
    originalUrl: 'https://github.com/vitejs/vite/tree/main',
    docsUrl: 'https://github.com/vitejs/vite/tree/main/docs',
    Icon: () => ViteIcon({ height: 30 }),
  },
]

export function projectExists(requestedProject: string | boolean) {
  return PROJECTS.findIndex((p) => p.url === requestedProject) > -1
}

export function findProject(requestedProject: string | boolean) {
  return PROJECTS.find((p) => p.url === requestedProject)
}

export function getSettingsKeyName(envKey: string) {
  return camelize(`${envKey}`)
}
