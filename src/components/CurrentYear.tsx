"use client";

import { useSyncExternalStore } from "react";

// The calendar year never changes mid-visit, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * The current year, read in the visitor's browser.
 *
 * Every page is prerendered, so `new Date()` in a server component freezes the
 * year at build time and the footer would show last year's © until the next
 * deploy. `useSyncExternalStore` hydrates with the build-time year (no
 * hydration mismatch) and then switches to the browser's clock.
 */
export default function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
}
