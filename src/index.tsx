import { serveStatic } from '@hono/node-server/serve-static';
import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';

const airswapUrl = 'https://swap.eth.limo/#/order/';

type State = {
  otcUrl: string | undefined;
  orderDetails: string | undefined;
};

export const app = new Frog<{ State: State }>({
  title: 'AirSwap OTC URL Frame',
  initialState: {
    otcUrl: undefined,
  },
});

app.use('/*', serveStatic({ root: './public' }));
app.frame('/', (c) => {
  const { inputText, deriveState } = c;
  deriveState((previousState) => {
    if (inputText?.includes(airswapUrl)) {
      previousState.otcUrl = inputText;
    } else {
      previousState.otcUrl = 'invalid URL';
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
        Welcome AirSwap OTC Maker!
        {/* <br /> */}
        {/* {inputText && !validInput ? <span style={{color: '#ff0101'}}>Please enter a valid OTC URL...</span> : undefined} */}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter OTC URL..." />,
      <Button action="/orderDetails">Upload OTC URL</Button>,
    ],
  });
});

app.frame('/orderDetails', (c) => {
  const { inputText, deriveState, previousState } = c;
  deriveState((previousState) => {
    if (inputText) {
      previousState.orderDetails = inputText;
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
        {`OTC URL: ${previousState.otcUrl}`}
        <br />
        {`(Enter order description below, e.g. "Swap 50 ETH for 200,000 USDC")`}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter order description..." />,
      <Button action="/otcurl">Upload Order Details</Button>,
      <Button.Reset>Back</Button.Reset>,
    ],
  });
});

app.frame('/otcurl', (c) => {
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
        {`(clicking this frame will redirect you to AirSwap to fill this order`}
      </div>
    ),
    intents: [
      <Button.Link href={previousState.otcUrl ? previousState.otcUrl : '/'}>
        Share
      </Button.Link>,
      <Button.Reset>Start over</Button.Reset>,
    ],
  });
});

devtools(app, { serveStatic });
