export function prefix(namespace: string | undefined, key: string) {
  return namespace ? `${namespace}:${key}` : key;
}

export function parse(value: string | null) {
  if (!value) return undefined;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
