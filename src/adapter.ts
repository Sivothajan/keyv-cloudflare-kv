import { ApiKVClient } from './api-client';
import { parse, prefix } from './utils';
import { WorkersKVClient } from './workers-client';

import type { KeyvCloudflareOptions } from './types';

export default class KeyvCloudflare {
  private client: any;
  private namespace?: string;

  constructor(options: KeyvCloudflareOptions) {
    this.namespace = options.namespace;

    if (options.mode === 'workers') {
      this.client = new WorkersKVClient(options.kv);
      return;
    }

    if (options.mode === 'api') {
      this.client = new ApiKVClient(
        options.client,
        options.accountId,
        options.namespaceId
      );
      return;
    }
  }

  async get(key: string) {
    const k = prefix(this.namespace, key);
    const value = await this.client.get(k);
    return parse(value);
  }

  async set(key: string, value: any, ttl?: number) {
    const k = prefix(this.namespace, key);
    await this.client.set(k, JSON.stringify(value), ttl);
    return true;
  }

  async delete(key: string) {
    const k = prefix(this.namespace, key);
    await this.client.delete(k);
    return true;
  }

  async getMany(keys: string[]) {
    return Promise.all(keys.map((k) => this.get(k)));
  }

  async setMany(entries: [string, any][], ttl?: number) {
    return Promise.all(entries.map(([k, v]) => this.set(k, v, ttl)));
  }

  async deleteMany(keys: string[]) {
    return Promise.all(keys.map((k) => this.delete(k)));
  }
}
