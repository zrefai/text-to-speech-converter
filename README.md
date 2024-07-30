## Requirements

- The user should be able to input text into a text area
- The user should be able to select a voice from a dropdown. The voice options should be fetched from the Voice Model API and which models to show is up to you.
- When the user clicks the "Convert" button, the text should be converted to speech. You can use the TTS API to do this.
- The right section of the page should display the converted speech output.
- The conversion takes some time to process and we should show appropriate loading states. Expect the conversion to take about 10 seconds, but it can take longer.
- After the conversion is complete, the user should be able to download the speech output as an audio file. Bonus points for making the output playable in the browser.

## Getting started

Run the install script

```bash
npm install
```

Setup the environment variables by creating a `.env.local` file with these variables:

```
NEXT_PUBLIC_KITS_API_KEY=<add API key here>
NEXT_PUBLIC_KITS_URL='https://arpeggi.io'
```

To run locally with watch enabled, run:

```bash
npm run dev
```

To run a build:

```bash
npm run build
npm run start
```
