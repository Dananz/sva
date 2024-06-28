const isKey = <T extends object>(
  x: T | undefined,
  k: PropertyKey,
): k is keyof T => !!x && k in x;

const mapFalsyToUndefined = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value || undefined]),
  ) as T;

export { isKey, mapFalsyToUndefined };
