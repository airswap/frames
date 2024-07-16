import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'

type State = {
  otcUrl: string | undefined
}

export const app = new Frog<{ State: State }>({
  title: "AirSwap OTC URL Frame",
  initialState: {
    otcUrl: undefined
  }
})

// const airswapId = 'https://swap.eth.limo/#/order'
const airswapId = 'https://swap.eth.limo/#/order/'

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { inputText, status, deriveState } = c

  deriveState(previousState => {
    if (inputText?.includes(airswapId)) {
      previousState.otcUrl = inputText}
    })

  const otcUrl = inputText || undefined

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? '#2c70ff'
              : '#030712',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && otcUrl
            ? `${otcUrl}`
            : 'Welcome AirSwap OTC Maker!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter OTC URL..." />,
      <Button action="/otcurl">Upload OTC URL</Button>
    ],
  })
})

devtools(app, { serveStatic })
