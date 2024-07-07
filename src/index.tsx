import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  title: "AirSwap OTC URL Frame"
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  console.log(c)
  const { inputText, status } = c
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
          {status === 'response'
            ? `${otcUrl}`
            : 'Welcome AirSwap OTC Maker!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter OTC URL..." />,
      <Button value={inputText}>Upload</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })
