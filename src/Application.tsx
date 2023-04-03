import './styles/tailwind.css'
import Nullstack from 'nullstack'

class Application extends Nullstack {

  render() {
    return (
      <body class="bg-gray-900 text-white">
        <p class="text-center text-lg">Hello World!</p>
      </body>
    )
  }

}

export default Application
