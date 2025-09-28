import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="divide-y">
      <header className="flex items-center justify-between gap-x-6 p-4">
        <h1 className="font-medium">sh03 stack</h1>
        <nav className="flex items-center gap-x-12">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            // @ts-ignore
            to="/not-found"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Not found
          </Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};
