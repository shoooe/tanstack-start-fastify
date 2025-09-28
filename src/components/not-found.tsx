import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function NotFound({ children }: Props) {
  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children ?? <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex items-center gap-2 flex-wrap">
        <Link
          to="/"
          className="border px-2 py-1 rounded uppercase font-black text-sm"
        >
          Start Over
        </Link>
      </p>
    </div>
  );
}
