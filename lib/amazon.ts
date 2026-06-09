export const AMAZON_TAG = "cclaserdepi01-21";

export function amazonLink(asin: string): string {
  return `https://www.amazon.es/dp/${asin}?tag=${AMAZON_TAG}`;
}
