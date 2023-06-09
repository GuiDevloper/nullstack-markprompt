import '../styles/WithCaret.css'
import Nullstack from 'nullstack'

import 'prism-material-themes/themes/material-palenight.css'
import { highlight as PrismHighlight, languages as PrismLangs } from 'prismjs'
import { Remarkable } from 'remarkable'

declare const Caret: WithCaret['renderCaret']
import type { NullstackMarkpromptProps } from './Markprompt'

import 'prismjs/components/prism-jsx.min'
const MD = new Remarkable({
  highlight(code, lang) {
    if (!PrismLangs[lang]) {
      return PrismHighlight(code, PrismLangs.jsx, 'javascript')
    }

    return PrismHighlight(code, PrismLangs[lang], lang)
  },
})

function addHostToSublinks(host: string, content: string) {
  return content.replace(
    /\]\(([^http].*?)(\.md|)(#.*?|)\)/g,
    `](${host}$1.md$3)`,
  )
}

type WithCaretProps = NullstackMarkpromptProps & {
  loading: boolean
}

class WithCaret extends Nullstack<WithCaretProps> {

  simulateCaret({ loading, mdown }: Partial<WithCaretProps> & {
    mdown: string
  }) {
    return `${mdown} ${mdown.length > 0 && loading ? '▎' : ''}`
  }

  renderCaret() {
    return (
      <span class="caret animate-caret inline-block h-[16px] w-[4px] translate-y-[2px] translate-x-[2px] transform rounded-[1px] bg-pink-600 shadow-[0_0px_3px_0px_rgba(217,70,219,0.9)]" />
    )
  }

  render({ children, docsUrl, loading }: WithCaretProps) {
    const mdown = addHostToSublinks(docsUrl, children[0])
    const html = MD.render(this.simulateCaret({ mdown }))

    return html.length === 0 && loading ? (
      <Caret />
    ) : (
      <div
        class={`prompt-answer prose-invert prose-sm md:prose-base ${
          loading ? 'prompt-answer-loading' : 'prompt-answer-done'
        }`}
        html={html}
      />
    )
  }

}

export default WithCaret
