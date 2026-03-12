import Cloudflare from 'cloudflare';
import Keyv from 'keyv';

// This example imports the adapter directly from the src directory,
// but in a real project you would import it from the package.
import KeyvCloudflare from '../src';

const client = new Cloudflare({
  apiToken: process.env.CF_API_TOKEN,
});

const keyv = new Keyv({
  store: new KeyvCloudflare({
    mode: 'api',
    client,
    accountId: process.env.CF_ACCOUNT_ID!,
    namespaceId: process.env.CF_NAMESPACE_ID!,
  }),
});

(async () => {
  await keyv.set('foo', 'bar');
  const value = await keyv.get('foo');
  console.log(value); // 'bar'
})();
