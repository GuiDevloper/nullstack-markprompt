import Nullstack from 'nullstack'

class ProjectsDropdown extends Nullstack {

  isOpen = false

  render() {
    return (
      <div class="relative inline-block text-left bg-gray-900 ">
        <div>
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-inherit px-3 py-2 text-sm font-semibold text-inherit hover:shadow-md shadow-gray-50"
            id="menu-button"
            aria-expanded={this.isOpen}
            aria-haspopup="true"
            onclick={{ isOpen: !this.isOpen }}
          >
            Projects
            <svg
              class={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
                this.isOpen ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          class={`hidden-scrollbar absolute right-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-inherit border border-gray-200 border-opacity-25 focus:outline-none text-inherit max-h-32 overflow-y-auto ${
            !this.isOpen ? 'hidden' : ''
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1">
            <a
              href="/"
              class="block px-4 py-2 border-b border-gray-700 text-sm hover:underline hover:text-pink-200"
              role="menuitem"
            >
              Nullstack
            </a>
            <a
              href="/vite"
              class="block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-2"
            >
              ViteJS
            </a>
          </div>
        </div>
      </div>
    )
  }

}

export default ProjectsDropdown
