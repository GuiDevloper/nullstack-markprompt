export const PROJECTS = [
  { url: '', name: 'Nullstack' },
  { url: 'vite', name: 'ViteJS' },
]

export function projectExists(requestedProject: string | boolean) {
  return PROJECTS.findIndex((p) => p.url === requestedProject) > -1
}

export function findProject(requestedProject: string) {
  return PROJECTS.find((p) => p.url === requestedProject)
}
