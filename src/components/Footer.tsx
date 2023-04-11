import Nullstack from 'nullstack'
import NullstackLogo from 'nullstack/logo'

import GitHubIcon from './Icons/GitHubIcon'
import MarkpromptIcon from './Icons/MarkpromptIcon'

class Footer extends Nullstack {

  render() {
    return (
      <p class="w-full text-center text-gray-300 text-xs font-semibold">
        Powered by{' '}
        <a
          target="_blank"
          href="https://markprompt.com"
          class="inline-block hover:-translate-y-1 -translate-y-0.5  duration-200 align-middle"
        >
          <MarkpromptIcon class="h-5 inline-block" />
        </a>{' '}
        &{' '}
        <a
          target="_blank"
          href="https://nullstack.app"
          class="inline-block hover:-translate-y-1.5 -translate-y-1 duration-200 align-middle"
        >
          <NullstackLogo height={18} light />
        </a>
        {' - '}
        <a
          target="_blank"
          href="https://github.com/GuiDevloper/nullstack-markprompt#readme"
          class="inline-block hover:-translate-y-1 hover:underline duration-200 align-middle"
        >
          About <GitHubIcon height="20" width="20" class="inline mb-1" />
        </a>
      </p>
    )
  }

}

export default Footer
