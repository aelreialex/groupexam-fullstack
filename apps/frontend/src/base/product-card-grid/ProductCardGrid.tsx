import type { ReactNode } from "react";

type ProductCardGridProps = {
  children: ReactNode;
};

export function ProductCardGrid({ children }: ProductCardGridProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
