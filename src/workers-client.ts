import type { KVNamespace } from '@cloudflare/workers-types';

export class WorkersKVClient {
  constructor(private kv: KVNamespace) {}

  async get(key: string) {
    return this.kv.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    await this.kv.put(key, value, {
      expirationTtl: ttl ? Math.floor(ttl / 1000) : undefined,
    });
  }

  async delete(key: string) {
    await this.kv.delete(key);
  }
}
