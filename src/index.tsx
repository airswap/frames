import { serveStatic } from '@hono/node-server/serve-static';
import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { divStyles } from './utils/divStyles';

type State = {
  otcUrl: string | undefined;
  orderDetails: string | undefined;
};

const airswapOTCUrl = 'https://swap.eth.limo/#/order/';

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
      <div style={divStyles.outerDiv}>
        <div style={divStyles.innerDiv1} />
        <div style={divStyles.innerDiv2}>Welcome AirSwap OTC Maker!</div>
        <div style={divStyles.innerDiv3}>Enter your OTC URL below</div>
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
      <div style={divStyles.outerDiv}>
        <div style={divStyles.innerDiv1} />
        <div style={divStyles.innerDiv2}>
          Enter your proposed order details below, e.g. "Swap 50 ETH for 200,000
          USDC"
        </div>
        <div style={divStyles.innerDiv3} />
      </div>
    ),
    intents: [
      <TextInput placeholder="Now enter order description..." />,
      <Button action="/otcurl">Upload Order Details</Button>,
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
      <div style={divStyles.outerDiv}>
        <div style={divStyles.innerDiv1} />
        <div style={divStyles.innerDiv2}>
          {previousState.otcUrl}
          <br />
          {inputText}
        </div>
        <div style={divStyles.innerDiv3}>
          Click "Share" button below to make this frame sharable with your
          followers. Otherwise click "Start over"
        </div>
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
      <div style={divStyles.outerDiv}>
        <div style={divStyles.innerDiv1} />
        <div style={divStyles.innerDiv2}>{previousState.orderDetails}</div>
        <div style={divStyles.innerDiv3}>
          Click "Fill order" to be redirected to AirSwap to take this OTC order!
        </div>
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
