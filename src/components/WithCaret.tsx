import Nullstack from 'nullstack'

import { Remarkable } from 'remarkable'

declare const Caret: WithCaret['renderCaret']
import type { NullstackMarkpromptProps } from './Markprompt'

const MD = new Remarkable()

function addHostToSublinks(host: string, content: string) {
  return content.replace(/\]\(([^http]){1}/, `](${host}$1`)
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

    return mdown.length === 0 && loading ? (
      <Caret />
    ) : (
      <div class="result" html={html} />
    )
  }

}

export default WithCaret