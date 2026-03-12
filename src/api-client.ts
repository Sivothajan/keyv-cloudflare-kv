import type Cloudflare from 'cloudflare';

export class ApiKVClient {
  constructor(
    private client: Cloudflare,
    private accountId: string,
    private namespaceId: string
  ) {}

  async get(key: string) {
    return this.client.kv.namespaces.values.get(this.namespaceId, key, {
      account_id: this.accountId,
    });
  }

  async set(key: string, value: string, ttl?: number) {
    await this.client.kv.namespaces.values.update(this.namespaceId, key, {
      account_id: this.accountId,
      value,
      expiration_ttl: ttl ? Math.floor(ttl / 1000) : undefined,
    });
  }

  async delete(key: string) {
    await this.client.kv.namespaces.values.delete(this.namespaceId, key, {
      account_id: this.accountId,
    });
  }
}
