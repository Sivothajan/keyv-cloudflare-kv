import type { KVNamespace } from '@cloudflare/workers-types';
import type Cloudflare from 'cloudflare';

export interface CloudflareApiOptions {
  client: Cloudflare;
  accountId: string;
  namespaceId: string;
}

export interface WorkersKVOptions {
  kv: KVNamespace;
}

interface BaseOptions {
  namespace?: string;
}

export type KeyvCloudflareOptions =
  | (BaseOptions & { mode: 'api' } & CloudflareApiOptions)
  | (BaseOptions & { mode: 'workers' } & WorkersKVOptions)
  | (BaseOptions & {
      mode?: 'auto';
      kv?: KVNamespace;
      client?: Cloudflare;
      accountId?: string;
      namespaceId?: string;
    });
