import Keyv from 'keyv';

import KeyvCloudflare from '../src';

import type { KVNamespace } from '@cloudflare/workers-types';

// This example imports the adapter directly from the src directory,
// but in a real project you would import it from the package.

interface Env {
  MY_KV: KVNamespace;
}

export default {
  async fetch(req: Request, env: Env) {
    const keyv = new Keyv({
      store: new KeyvCloudflare({
        mode: 'workers',
        kv: env.MY_KV,
      }),
    });

    await keyv.set('hello', 'world');

    const value = await keyv.get('hello');

    return new Response(value);
  },
};
