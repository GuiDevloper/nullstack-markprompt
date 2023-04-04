import Nullstack from 'nullstack'

class ErrorPage extends Nullstack {

  render() {
    return (
      <div class="flex flex-col justify-center text-center h-screen">
        <h1 class="text-4xl">404!</h1>
        <h2 class="text-2xl">Project not found!</h2>
        <h3 class="text-lg">
          <a href="/" class="underline text-pink-300 hover:text-pink-400">
            Go to home
          </a>
        </h3>
      </div>
    )
  }

}

export default ErrorPage
