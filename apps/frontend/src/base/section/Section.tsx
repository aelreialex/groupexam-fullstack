import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  background?: boolean;
};

export function Section({ children, background = false }: SectionProps) {
  return (
    <section className={`py-12 ${background ? "bg-bg-section-alternate" : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
