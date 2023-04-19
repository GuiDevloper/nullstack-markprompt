# Test

Personal [ChatGPT](https://chat.openai.com/)s for questions about docs powered by [Markprompt](https://markprompt.com) & [Nullstack](https://nullstack.app)

> [Twitter thread with videos explaining more the project in portuguese](https://twitter.com/GuiDevloper/status/1646328285133955078)

<img src='https://raw.githubusercontent.com/nullstack/nullstack/master/nullstack.png' height='40' alt='Nullstack' />

## How to run this project

Install the dependencies:

`pnpm install`

Rename the **.env.example** file to **.env** and update with your MarkPrompt keys.

> With exception of keys, the project configuration data is in the `PROJECTS` constant at [projects.ts](./src/utils/projects.ts), replace that to make it work as you like

Run the app in development mode:

`pnpm start`

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Learn more

- [Read Nullstack documentation](https://nullstack.app/documentation)
- [Read Markprompt documentation](https://github.com/motifland/markprompt)
- It was made based on [markprompt-starter-template](https://github.com/motifland/markprompt-starter-template)

## Thanks

- [Michael Fester](https://github.com/michaelfester) for the [Markprompt Starter](https://github.com/motifland/markprompt-starter-template) project and doing a lot of work in projects like [Motif](https://github.com/motifland).
- [Mortaro](https://github.com/Mortaro) and the [Nullstack Team](https://nullstack.app/contributors) for the work in the amazing full-stack framework Nullstack.
