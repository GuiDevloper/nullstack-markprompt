import Nullstack, { NullstackClientContext } from 'nullstack'

import {
  ChatCompletionsModel,
  CompletionsModel,
  DEFAULT_MODEL,
  OpenAIModel,
} from '../types'

const OpenAIModels = [...ChatCompletionsModel, ...CompletionsModel]

class ModelSelect extends Nullstack {

  selectedModel: OpenAIModel = DEFAULT_MODEL

  hydrate({
    params,
  }: NullstackClientContext & {
    params: { model: OpenAIModel }
  }) {
    if (params.model && OpenAIModels.indexOf(params.model) > -1) {
      this.selectedModel = params.model
    }
  }

  goToModel({ params }: NullstackClientContext) {
    params.model = this.selectedModel
  }

  render() {
    return (
      <form class="flex place-content-end text-sm text-gray-400">
        <label for="model-select" class="mt-0.5">
          Model:
        </label>
        <select
          class="bg-inherit"
          onchange={this.goToModel}
          bind={this.selectedModel}
          id="model-select"
        >
          {OpenAIModels.map((Model) => (
            <option class="bg-black" value={Model}>
              {Model}
            </option>
          ))}
        </select>
      </form>
    )
  }

}

export default ModelSelect
