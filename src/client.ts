import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from '@trpc/client';
// import AbortController from 'abort-controller';
import fetch from 'node-fetch';
import ws from 'ws';
import type { AppRouter } from './route';

// polyfill fetch & websocket
const globalAny = global as any;
// globalAny.AbortController = AbortController;
globalAny.fetch = fetch;
globalAny.WebSocket = ws;

const wsClient = createWSClient({
  url: `ws://localhost:3000`,
});
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // call subscriptions through websockets and the rest over http
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpLink({
        url: `http://localhost:3000`,
      }),
    }),
  ],
});

async function main() {
  // const helloResponse = await trpc.health.query();

  // console.log('helloResponse', helloResponse);

  // const helloResponse = await trpc.greeting.hello.query({
  //   name: 'world',
  // });

  // console.log('helloResponse', helloResponse);
  await new Promise<void>((resolve) => {
    const subscription = trpc.app.randomNumber.subscribe(undefined, {
      onData(data: any) {
        // ^ note that `data` here is inferred
        console.log('received', data);
        // if (count > 3) {
        //   // stop after 3 pulls
        //   subscription.unsubscribe();
        //   resolve();
        // }
      },
      onError(err: Error) {
        console.error('error', err);
      },
    });
  });
  //wsClient.close();
}

main();
