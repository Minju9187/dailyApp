import { ReactNode } from "react";
import Navbar from "./components/Navbar";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto mt-6">
      <Navbar />
      {children}
    </div>
  );
}
