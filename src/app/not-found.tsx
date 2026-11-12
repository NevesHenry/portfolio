import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 sm:min-h-[70vh] sm:justify-center">
      <p className="font-mono text-sm text-ink-faint">
        <span className="text-flag">404</span> · no such file or directory
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
        The link may be old, or the address mistyped. Everything on the site is
        one hop from the home page.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/"
          className="rounded-sm bg-accent px-5 py-2.5 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90"
        >
          cd ~
        </Link>
        <Link
          href="/projects"
          className="rounded-sm border border-line px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-ink-soft"
        >
          ~/projects
        </Link>
      </div>
    </section>
  );
}
