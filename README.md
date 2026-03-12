# keyv-cloudflare-kv

Cloudflare KV adapter for Keyv.

This adapter allows Keyv to use Cloudflare Workers KV as a storage backend.

It supports two environments:

- Cloudflare Workers → uses native KV binding
- Node.js / Bun / servers → uses the Cloudflare API

This allows the same backend code to run anywhere.

---

## Installation

```bash
# npm
npm install keyv-cloudflare-kv

# bun
bun add keyv-cloudflare-kv
```

---

## Usage

### Node / Bun (Cloudflare API mode)

```javascript
import Keyv from 'keyv';
import Cloudflare from 'cloudflare';
import KeyvCloudflare from 'keyv-cloudflare-kv';

const client = new Cloudflare({
  apiToken: process.env.CF_API_TOKEN,
});

const store = new KeyvCloudflare({
  mode: 'api',
  client,
  accountId: process.env.CF_ACCOUNT_ID,
  namespaceId: process.env.CF_NAMESPACE_ID,
});

const keyv = new Keyv({ store });

await keyv.set('hello', 'world');

const value = await keyv.get('hello');

console.log(value);
```

---

### Cloudflare Workers

```javascript
import Keyv from 'keyv';
import KeyvCloudflare from 'keyv-cloudflare-kv';

export default {
  async fetch(request, env) {
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
```

---

## Options

### API Mode

| Option      | Type       | Required | Description           |
| ----------- | ---------- | -------- | --------------------- |
| mode        | "api"      | yes      | Use Cloudflare API    |
| client      | Cloudflare | yes      | Cloudflare SDK client |
| accountId   | string     | yes      | Cloudflare account ID |
| namespaceId | string     | yes      | KV namespace ID       |
| namespace   | string     | no       | Optional key prefix   |

---

### Workers Mode

| Option    | Type        | Required | Description         |
| --------- | ----------- | -------- | ------------------- |
| mode      | "workers"   | yes      | Worker runtime      |
| kv        | KVNamespace | yes      | Worker KV binding   |
| namespace | string      | no       | Optional key prefix |

---

## Namespace Prefixing

You can optionally prefix keys:

```text
namespace: "permissions"
```

Example stored keys:

```text
permissions:user:1
permissions:user:2
```

---

## Development

Install dependencies

```bash
bun install
```

Run lint

```.bash
bun run lint
```

Build

```bash
bun run build
```

---

## License

[MIT](./LICENSE)
