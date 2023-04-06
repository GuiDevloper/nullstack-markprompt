import NullstackLogo from 'nullstack/logo'

import ViteIcon from '../components/ViteIcon'

export const PROJECTS = [
  // Replacing with your project data makes it usable for you
  {
    url: '',
    name: 'Nullstack',
    envKey: 'DEFAULT_KEY',
    Icon: () => NullstackLogo({ height: 20, light: true }),
  },
  {
    url: 'vite',
    name: 'ViteJS',
    envKey: 'VITE_KEY',
    Icon: () => ViteIcon({ height: 30 }),
  },
]

export function projectExists(requestedProject: string | boolean) {
  return PROJECTS.findIndex((p) => p.url === requestedProject) > -1
}

export function findProject(requestedProject: string | boolean) {
  return PROJECTS.find((p) => p.url === requestedProject)
}
