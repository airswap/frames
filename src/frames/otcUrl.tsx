import { app } from '../index'

app.frame('/otcurl', (c) => {
  const { deriveState } = c
  return c.res({
    image: (
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
        }}>
          OTC URL: {deriveState}
      </div>
    )
  })
})
