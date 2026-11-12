import CurrentYear from "./CurrentYear";
import { authorName } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          © <CurrentYear buildYear={new Date().getFullYear()} /> {authorName} —{" "}
          <span className="whitespace-nowrap">built with Next.js</span>
        </p>
        <p className="font-mono">
          <span aria-hidden="true" className="text-accent">
            ●
          </span>{" "}
          status: open to new roles
        </p>
      </div>
    </footer>
  );
}
