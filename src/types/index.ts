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

export const DEFAULT_MODEL: OpenAIModel = 'gpt-4'
