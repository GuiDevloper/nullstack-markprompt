import Nullstack, { NullstackClientContext } from 'nullstack'

import Footer from './components/Footer'
import Markprompt, { OpenAIModel } from './components/Markprompt'
import ModelSelect from './components/ModelSelect'
import ProjectIcon from './components/ProjectIcon'
import ProjectsDropdown from './components/ProjectsDropdown'
import { findProject, getSettingsKeyName } from './utils/projects'

class Home extends Nullstack {

  prepare({ project, page }: NullstackClientContext) {
    page.title = `${project.name}`
    page.description = `${project.name} was made with Nullstack`
  }

  render({
    params,
    settings,
  }: NullstackClientContext & {
    params: { model: OpenAIModel }
  }) {
    const PROJECT = findProject(params.project)
    const projectKey = settings[getSettingsKeyName(PROJECT.envKey)]

    return (
      <section class="w-full max-w-3xl h-screen mx-auto flex flex-wrap">
        <div class="flex h-[calc(100vh-50px)] w-screen items-center justify-center px-4 py-4 pb-0">
          <div class="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-8">
            <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <ProjectIcon />
              <ProjectsDropdown />
            </div>
            <div class="max-h-[700px] w-full max-w-[720px] flex-grow rounded-xl bg-neutral-1100 p-8 pb-10 shadow-2xl">
              {projectKey ? (
                <Markprompt
                  projectKey={projectKey.toString()}
                  projectName={PROJECT.name}
                  originalUrl={PROJECT.originalUrl}
                  docsUrl={PROJECT.docsUrl}
                  model={params.model}
                />
              ) : (
                <p class="px-4 pt-12 text-center text-sm text-neutral-400">
                  You need to set the{' '}
                  <code class="font-mono text-sky-400">
                    NULLSTACK_SETTINGS_{PROJECT.envKey}
                  </code>{' '}
                  environment variable to your project&apos;s public API key.
                  You can find your key in the Markprompt dashboard, under the
                  project settings.
                </p>
              )}
              <ModelSelect />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    )
  }

}

export default Home
