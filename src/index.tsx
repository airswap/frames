import { serveStatic } from '@hono/node-server/serve-static';
import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';

const airswapOTCUrl = 'https://swap.eth.limo/#/order/';

type State = {
  otcUrl: string | undefined;
  orderDetails: string | undefined;
};

export const app = new Frog<{ State: State }>({
  title: 'AirSwap OTC URL Frame',
  initialState: {
    otcUrl: undefined,
    orderDetails: undefined,
  },
});

app.use('/*', serveStatic({ root: './public' }));
app.frame('/', (c) => {
  return c.res({
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
          fontSize: '30px',
        }}
      >
        Welcome AirSwap OTC Maker!
        <br /> Enter your OTC URL below{' '}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter OTC URL..." />,
      <Button action="/orderDetails">Upload OTC URL</Button>,
    ],
  });
});

app.frame('/orderDetails', (c) => {
  const { inputText, deriveState } = c;
  deriveState((previousState) => {
    if (inputText?.includes(airswapOTCUrl)) {
      previousState.otcUrl = inputText;
    } else {
      previousState.otcUrl = 'invalid OTC URL';
    }
  });

  return c.res({
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
          fontSize: '30px',
        }}
      >
        {`Now enter order description below, e.g. "Swap 50 ETH for 200,000 USDC"`}
      </div>
    ),
    intents: [
      <TextInput placeholder="Now enter order description..." />,
      <Button action="/otcurl">Upload Order Details</Button>,
      <Button.Reset>Back</Button.Reset>,
    ],
  });
});

app.frame('/otcurl', (c) => {
  const { inputText, deriveState, previousState } = c;
  deriveState((previousState) => {
    previousState.orderDetails = inputText;
  });

  return c.res({
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
          fontSize: '30px',
        }}
      >
        {previousState.otcUrl}
        <br />
        {inputText}
        <br />
        {`(Click "Share" button below to make this frame sharable with your followers. Otherwise click "Start over")`}
      </div>
    ),
    intents: [
      <Button action="/sharable">Share</Button>,
      <Button.Reset>Start over</Button.Reset>,
    ],
  });
});

app.frame('/sharable', (c) => {
  const { previousState } = c;
  return c.res({
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
          fontSize: '30px',
        }}
      >
        {previousState.orderDetails}
        <br />

        {`(Click "Fill order" to be redirected to AirSwap to take this OTC order!`}
      </div>
    ),
    intents: [
      <Button.Link href={previousState.otcUrl ? previousState.otcUrl : '/'}>
        Fill order
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });
