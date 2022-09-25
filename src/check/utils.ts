export function getFromObject<T>(obj: object, key: string): T | undefined {
  return Object.entries(obj).find(([k, _]) => k === key)?.[1];
}
