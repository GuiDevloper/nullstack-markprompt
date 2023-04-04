import './styles/tailwind.css'
import Nullstack, { NullstackClientContext } from 'nullstack'

import ErrorPage from './ErrorPage'
import { projectExists } from './utils/projects'

class Application extends Nullstack {

  render({ params }: NullstackClientContext) {
    return (
      <body class="bg-gray-900 text-white">
        {!projectExists(params.project) && <ErrorPage route="*" />}
        <div route="/:project" />
      </body>
    )
  }

}

export default Application
