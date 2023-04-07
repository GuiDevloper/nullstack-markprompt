import '../styles/Markprompt.css'
import Nullstack, { NullstackClientContext } from 'nullstack'

import WithCaret from './WithCaret'

declare const References: Markprompt['renderReferences']

const MARKPROMPT_COMPLETIONS_URL = 'https://api.markprompt.com/v1/completions'
const STREAM_SEPARATOR = '___START_RESPONSE_STREAM___'

export type OpenAIModel = OpenAIChatCompletionsModel | OpenAICompletionsModel

export const ChatCompletionsModel = [
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-32k',
  'gpt-4-32k-0314',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0301',
] as const

type OpenAIChatCompletionsModel = (typeof ChatCompletionsModel)[number]

export const CompletionsModel = [
  'text-davinci-003',
  'text-davinci-002',
  'text-curie-001',
  'text-babbage-001',
  'text-ada-001',
  'davinci',
  'curie',
  'babbage',
  'ada',
] as const

type OpenAICompletionsModel = (typeof CompletionsModel)[number]

export const DEFAULT_MODEL: OpenAIModel = 'gpt-3.5-turbo'

type MarkpromptProps = {
  projectKey: string
  originalUrl: string
  docsUrl: string
  projectName?: string
  model?: OpenAIModel
  iDontKnowMessage?: string
  placeholder?: string
  autoScrollDisabled?: boolean
  /** Markprompt API url */
  completionsUrl?: string
}

export type NullstackMarkpromptProps = Partial<MarkpromptProps> &
  Partial<NullstackClientContext>

class Markprompt extends Nullstack<MarkpromptProps> {

  prompt = ''
  answer = ''
  references: string[] = []
  loading = false
  containerRef: HTMLDivElement
  answerContainerRef: HTMLDivElement

  getPlaceholder({ placeholder, projectName }: NullstackMarkpromptProps) {
    if (placeholder) return placeholder

    return `Ask me anything${projectName ? ` about ${projectName}` : ''}...`
  }

  autoScroll({ autoScrollDisabled = false }: NullstackMarkpromptProps) {
    if (autoScrollDisabled || !this.containerRef || !this.answerContainerRef) {
      return
    }

    const childRect = this.answerContainerRef.getBoundingClientRect()
    this.containerRef.scrollTop = childRect.bottom
  }

  setAnswer({ msg = null }) {
    if (msg === null) {
      this.answer = ''
      return
    }
    this.answer += msg
    this.autoScroll({})
  }

  setReferences({ refs = [] }) {
    this.references = refs
    // waiting for the slide-up animation
    setTimeout(this.autoScroll, 200)
  }

  renderReferences({ originalUrl }: NullstackMarkpromptProps) {
    return (
      this.answer.length > 0 &&
      this.references.length > 0 && (
        <div class="mt-8 border-t border-neutral-900 pt-4 text-sm text-neutral-500">
          <div class="animate-slide-up">
            Summary generated from the following sources:
            <div class="mt-4 flex w-full flex-row flex-wrap items-center gap-2">
              {this.references.map((r) => (
                <a
                  class="cursor-pointer rounded-md border border-neutral-900 bg-neutral-1100 px-2 py-1 font-medium text-neutral-300 transition hover:border-neutral-800 hover:text-neutral-200"
                  href={`${originalUrl}${r}`}
                  target="_blank"
                >
                  {r}
                </a>
              ))}
            </div>
          </div>
        </div>
      )
    )
  }

  async callPrompt({
    projectKey,
    iDontKnowMessage = 'Error 404: Answer not found',
    completionsUrl = MARKPROMPT_COMPLETIONS_URL,
    model = DEFAULT_MODEL,
  }: NullstackMarkpromptProps) {
    if (!this.prompt || this.loading) {
      return
    }

    this.setAnswer({})
    this.setReferences({})
    this.loading = true

    try {
      const res = await fetch(completionsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: this.prompt,
          model,
          iDontKnowMessage,
          projectKey,
        }),
      })

      if (!res.ok || !res.body) {
        const text = await res.text()
        console.error('Error:', text)
        this.loading = false
        this.setAnswer({ msg: iDontKnowMessage })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let startText = ''
      let didHandleHeader = false
      let refs: string[] = []

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        if (!didHandleHeader) {
          startText = startText + chunkValue
          if (startText.includes(STREAM_SEPARATOR)) {
            const parts = startText.split(STREAM_SEPARATOR)
            try {
              refs = JSON.parse(parts[0])
              // eslint-disable-next-line no-empty
            } catch {}
            this.setAnswer({ msg: parts[1] })
            didHandleHeader = true
          }
        } else {
          this.setAnswer({ msg: chunkValue })
        }
      }
      this.loading = false
      this.setReferences({ refs })
    } catch (e) {
      console.error('Error', e)
      this.setAnswer({ msg: iDontKnowMessage })
    }
  }

  render({ docsUrl }: NullstackMarkpromptProps) {
    return (
      <div class="relative flex h-full flex-col prose-invert">
        <div class="h-12 border-b border-neutral-900">
          <form onsubmit={this.callPrompt}>
            <input
              bind={this.prompt}
              type="text"
              placeholder={this.getPlaceholder({})}
              class="w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-2 outline-none placeholder:text-neutral-500 focus:outline-none focus:ring-0 text-base md:text-lg"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="none"
              spellcheck="false"
              autofocus
            />
          </form>
        </div>
        <div
          ref={this.containerRef}
          class="hidden-scrollbar prose absolute inset-x-0 bottom-0 top-12 z-0 max-w-full overflow-y-auto scroll-smooth py-4 pb-8 dark:prose-invert"
        >
          <WithCaret loading={this.loading} docsUrl={docsUrl}>
            {this.answer}
          </WithCaret>
          <References />
          <div ref={this.answerContainerRef} />
        </div>
      </div>
    )
  }

}

export default Markprompt
