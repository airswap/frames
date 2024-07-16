import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'

type State = {
  otcUrl: string | undefined
}

export const app = new Frog<{ State: State }>({
  title: "AirSwap OTC URL Frame",
  // API key below is prone to rate limiting
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  verify: false,
  initialState: {
    otcUrl: undefined
  }
})

// const airswapId = 'https://swap.eth.limo/#/order'
const airswapId = 'https://swap.eth.limo/#/order/'

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { inputText, deriveState } = c

  deriveState(previousState => {
    if (inputText?.includes(airswapId)) {
      previousState.otcUrl = inputText}
    })

  return c.res({
    action: '/otcurl',
    image: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#030712',
          color: 'white',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        Welcome AirSwap OTC Maker!
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter OTC URL..." />,
      <Button>Upload OTC URL</Button>
    ],
  })
})

app.frame('/otcurl', (c) => {
  return c.res({
    image: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#030712',
          color: 'white',
          fontSize: '24px',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}>
          {`OTC URL: ${c.inputText}`}
      </div>
    )
  })
})

devtools(app, { serveStatic })

