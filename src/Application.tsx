import './styles/tailwind.css'
import Nullstack, { NullstackClientContext } from 'nullstack'

import ErrorPage from './ErrorPage'
import Home from './Home'
import { projectExists } from './utils/projects'

class Application extends Nullstack {

  prepare({ page }: NullstackClientContext) {
    page.locale = 'en-US'
  }

  render({ params }: NullstackClientContext) {
    return (
      <body class="bg-gray-900 text-white">
        {!projectExists(params.project) && <ErrorPage route="*" />}
        <Home route="/:project" />
      </body>
    )
  }

}

export default Application
