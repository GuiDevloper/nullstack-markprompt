import Nullstack, { NullstackClientContext } from 'nullstack'
import NullstackLogo from 'nullstack/logo'

import ProjectsDropdown from './components/ProjectsDropdown'

class Home extends Nullstack {

  prepare({ project, page }: NullstackClientContext) {
    page.title = `${project.name}`
    page.description = `${project.name} was made with Nullstack`
  }

  render({ params }) {
    return (
      <section class="w-full max-w-3xl h-screen mx-auto flex flex-wrap">
        <div class="flex h-[calc(100vh-50px)] w-screen items-center justify-center px-4 py-4 pb-0">
          <div class="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-8">
            <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {!params.project && <NullstackLogo height={20} light />}
              <ProjectsDropdown />
            </div>
            <div class="max-h-[700px] w-full max-w-[720px] flex-grow rounded-xl bg-neutral-1100 p-8 shadow-2xl">
              <p class="px-4 pt-12 text-center text-sm text-neutral-400">
                You need to set the{' '}
                <code class="font-mono text-sky-400">
                  NULLSTACK_SETTINGS_DEFAULT_KEY
                </code>{' '}
                environment variable to your project&apos;s public API key. You
                can find your key in the Markprompt dashboard, under the project
                settings.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default Home
